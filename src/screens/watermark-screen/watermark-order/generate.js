import React, { useRef, useState, useEffect } from 'react'
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import RNFS from 'react-native-fs'
import CameraRoll from '@react-native-community/cameraroll'
import * as Progress from 'react-native-progress'

import html from './generate-html'
import { generateTempPath } from '../../../utils/file'
import { Header, Modal, Button, Layout, Text } from '../../../components'
import { useStores } from '../../../models/root-store'
import { observer } from 'mobx-react-lite'
import { Colors } from '../../../theme'

const styles = StyleSheet.create({
  progress: {
    alignSelf: 'center',
    marginTop: 20,
  },
  textSuccess: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  webView: {
    display: 'none',
  },
})

export default observer(({ onSuccess }) => {
  const {
    watermarkStore: { imgUris, orderPrefix, xPercent, yPercent, fontSize },
  } = useStores()

  const webViewRef = useRef()
  const [imgIndex, setImgIndex] = useState(0)
  const [successVisible, setSuccessVisible] = useState(false)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (imgIndex === imgUris.length) {
      setSuccessVisible(true)
    } else {
      editImage()
    }
  }, [imgIndex])

  const editImage = async () => {
    const imgUri = imgUris[imgIndex]
    const imgText = `${orderPrefix} ${imgIndex + 1}`
    const imgBase64 = await RNFS.readFile(imgUri, 'base64')
    webViewRef.current.injectJavaScript(
      `(function() {
        editImage('${imgBase64}', '${imgText}', ${xPercent}, ${yPercent}, ${fontSize});
      })();`,
    )
  }

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      return true
    }
    const status = await PermissionsAndroid.request(permission)
    return status === 'granted'
  }

  const handleMessage = async e => {
    const imgBase64 = e.nativeEvent.data
    const imageData = imgBase64.split('data:image/png;base64,')[1]
    const imagePath = generateTempPath(`image_${imgIndex}.png`)
    await RNFS.writeFile(imagePath, imageData, 'base64')
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return
    }
    await CameraRoll.save(imagePath, { type: 'photo' })
    setImgIndex(imgIndex + 1)
  }

  const handleSuccess = () => {
    setSuccessVisible(false)
    onSuccess && onSuccess()
  }

  return (
    <Layout>
      <Header title='Generate Photo' hasBack={false} />
      <Progress.Circle
        size={150}
        progress={imgIndex / imgUris.length}
        showsText
        animated={false}
        style={styles.progress}
        color={Colors.primary}
      />
      <WebView
        ref={webViewRef}
        source={{ html }}
        onMessage={handleMessage}
        onLoad={editImage}
        containerStyle={styles.webView}
      />
      <Modal visible={successVisible}>
        <Text style={styles.textSuccess}>
          Done, please check watermarked photo in Album
        </Text>
        <Button text='OK' onPress={handleSuccess} />
      </Modal>
    </Layout>
  )
})
