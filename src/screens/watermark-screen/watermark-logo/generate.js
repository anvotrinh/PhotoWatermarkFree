import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { WebView } from 'react-native-webview'
import RNFS from 'react-native-fs'
import CameraRoll from '@react-native-community/cameraroll'
import * as Progress from 'react-native-progress'

import i from '../../../i18n'
import htmlRenderer from './generate-html'
import { generateTempPath } from '../../../utils/file'
import { Header, Modal, Button, Text, Layout } from '../../../components'
import { useStores } from '../../../models/root-store'
import { Colors, Metrics } from '../../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    watermarkStore: {
      imgUris,
      logo,
      title,
      code,
      codeLoc,
      xPercent,
      yPercent,
      fontSize,
    },
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
    const imgText = title
    const imgBase64 = await RNFS.readFile(imgUri, 'base64')
    webViewRef.current.injectJavaScript(
      `(function() {
        editImage('${imgBase64}', '${imgText}', '${code}', '${codeLoc}', ${xPercent}, ${yPercent}, ${(
        fontSize / Metrics.screenWidth
      ).toFixed(3)});
      })();`,
    )
  }

  const handleMessage = async e => {
    const imgBase64 = e.nativeEvent.data
    const imageData = imgBase64.split('data:image/png;base64,')[1]
    const imagePath = generateTempPath(`image_${imgIndex}.png`)
    await RNFS.writeFile(imagePath, imageData, 'base64')
    await CameraRoll.save(imagePath, { type: 'photo' })
    setImgIndex(imgIndex + 1)
  }

  const handleSuccess = () => {
    setSuccessVisible(false)
    onSuccess && onSuccess()
  }

  const html = htmlRenderer(logo)

  return (
    <Layout>
      <Header title={i.get('generate_photo')} hasBack={false} />
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
        <Text style={styles.textSuccess}>{i.get('generate_success')}</Text>
        <Button text={i.get('ok')} onPress={handleSuccess} />
      </Modal>
    </Layout>
  )
})
