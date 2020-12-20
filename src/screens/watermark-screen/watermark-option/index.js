import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Linking } from 'react-native'
import { observer } from 'mobx-react-lite'
import ImagePicker from 'react-native-image-crop-picker'

import { toFullLocalPath } from '../../../utils/file'
import { useStores } from '../../../models/root-store'
import { Modal, Text, Button, Layout, Header } from '../../../components'
import LogoOption from './logo-option'
import OrderOption from './order-option'
import { Metrics } from '../../../theme'

function isMissingPermissionMessage(message) {
  return (
    message.startsWith('Cannot access images') ||
    message.startsWith('Required permission missing')
  )
}

const styles = StyleSheet.create({
  btnSetting: {
    marginTop: Metrics.space.normal,
  },
  container: {
    flex: 1,
    padding: Metrics.space.small,
  },
  errorModalContainer: {
    padding: Metrics.space.normal,
  },
})

export default observer(({ setScreen }) => {
  const {
    watermarkStore: { loadData, updateData },
  } = useStores()

  const [mode, setMode] = useState('order')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenSetting = () => {
    Linking.openSettings()
  }

  const handleNext = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 100,
      })
      const imgUris = images.map(i => toFullLocalPath(i.path))
      updateData({ imgUris })
      setScreen(mode)
    } catch (e) {
      if (e.message === 'User cancelled image selection') {
        return
      }
      setErrorMessage(e.message)
    }
  }

  return (
    <Layout>
      <Header title='choose mode' onNext={handleNext} hasBack={false} />
      <OrderOption mode={mode} setMode={setMode} />
      <LogoOption
        mode={mode}
        setMode={setMode}
        setErrorMessage={setErrorMessage}
      />
      <Modal
        visible={!!errorMessage}
        onBackdropPress={() => setErrorMessage('')}
      >
        {isMissingPermissionMessage(errorMessage) ? (
          <View style={styles.errorModalContainer}>
            <Text h4>Need Permission</Text>
            <Text>Please grant Photo permission to use PhotoWatermark.</Text>
            <Button
              text='PhotoWatermark Settings'
              iconPack='ionicons'
              iconName='ios-settings'
              iconSize={15}
              onPress={handleOpenSetting}
              style={styles.btnSetting}
            />
          </View>
        ) : (
          <View style={styles.errorModalContainer}>
            <Text>{errorMessage}</Text>
          </View>
        )}
      </Modal>
    </Layout>
  )
})
