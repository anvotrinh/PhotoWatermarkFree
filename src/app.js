import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import messaging from '@react-native-firebase/messaging'

import { StatefulNavigator } from './navigation'
import { FlashMessage } from './components'
import { RootStoreProvider } from './models/root-store'
import { setupRootStore } from './models/root-store/setup-root-store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    // eslint-disable-next-line
    console.log('Authorization status:', authStatus)
  }
}

export default () => {
  const [rootStore, setRootStore] = useState()
  useEffect(() => {
    setupRootStore().then(setRootStore)
    requestUserPermission()
  }, [])

  if (!rootStore) {
    return null
  }

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaView style={styles.container}>
        <StatefulNavigator />
        <FlashMessage position='top' />
      </SafeAreaView>
    </RootStoreProvider>
  )
}
