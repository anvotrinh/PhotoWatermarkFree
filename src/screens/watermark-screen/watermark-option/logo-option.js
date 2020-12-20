import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { observer } from 'mobx-react-lite'
import ImagePicker from 'react-native-image-crop-picker'
import RNFS from 'react-native-fs'

import { useStores } from '../../../models/root-store'
import {
  Modal,
  Input,
  Text,
  Button,
  Icon,
  CheckBox,
  FormRow,
} from '../../../components'
import { Colors, Metrics } from '../../../theme'

const styles = StyleSheet.create({
  btnLogoBase64Submit: {
    marginTop: Metrics.space.small,
  },
  btnUploadLogo: {
    width: '50%',
  },
  checkBox: {
    backgroundColor: Colors.white,
    marginLeft: Metrics.space.xs,
    paddingHorizontal: Metrics.space.xs,
    paddingVertical: Metrics.space.small,
  },
  container: {
    marginBottom: Metrics.space.normal,
    paddingHorizontal: Metrics.space.small,
  },
  logo: {
    aspectRatio: 2.65,
    borderWidth: 1,
    marginTop: Metrics.space.small,
    resizeMode: 'stretch',
    width: '50%',
  },
  logoImageLabel: {
    color: Colors.gray,
    fontWeight: 'bold',
  },
  logoTitleWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  prefixTextLabel: {
    color: Colors.gray,
    fontWeight: 'bold',
  },
  textCheckBox: {
    fontWeight: 'bold',
  },
})

export default observer(({ mode, setMode, setErrorMessage }) => {
  const {
    watermarkStore: { logo, title, updateData },
  } = useStores()

  const [logoBase64Url, setLogoBase64Url] = useState('')
  const [base64ModalVisible, setBase64ModalVisible] = useState(false)

  const handleChooseLogo = async () => {
    try {
      const image = await ImagePicker.openPicker({})
      const imgData = await RNFS.readFile(image.path, 'base64')
      const imgBase64 = `data:image/png;base64,${imgData}`
      updateData({ logo: imgBase64 })
    } catch (e) {
      if (e.message === 'User cancelled image selection') {
        return
      }
      setErrorMessage(e.message)
    }
  }

  const handleLogoBase64Submit = async () => {
    try {
      if (!logoBase64Url) return
      const res = await fetch(logoBase64Url)
      const json = await res.json()
      updateData({ logo: json.base64 })
      setBase64ModalVisible(false)
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <CheckBox
        text='Mark by text'
        style={styles.checkBox}
        textStyle={styles.textCheckBox}
        checked={mode === 'logo'}
        onChange={() => setMode('logo')}
      />
      {mode === 'logo' && (
        <>
          <FormRow label='Title' labelStyle={styles.prefixTextLabel}>
            <Input
              value={title}
              onChangeText={title => updateData({ title })}
              placeholder='Your text'
            />
          </FormRow>
          <View style={styles.logoTitleWrapper}>
            <Icon name='md-image' size={25} />
            <Text style={styles.logoImageLabel}>
              Logo Image (ratio 2.65 : 1):
            </Text>
          </View>
          {logo && <Image source={{ uri: logo }} style={styles.logo} />}
          <Button
            text=' Choose Other Logo'
            style={styles.btnUploadLogo}
            onPress={handleChooseLogo}
            onLongPress={() => setBase64ModalVisible(true)}
          />
        </>
      )}
      <Modal
        visible={base64ModalVisible}
        onBackdropPress={() => setBase64ModalVisible(false)}
      >
        <Input
          value={logoBase64Url}
          onChangeText={setLogoBase64Url}
          placeholder='json URL with format { base64: ... }'
        />
        <Button
          text='Submit'
          onPress={handleLogoBase64Submit}
          style={styles.btnLogoBase64Submit}
        />
      </Modal>
    </View>
  )
})
