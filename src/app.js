import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import { StatefulNavigator } from './navigation'
import { FlashMessage } from './components'
import { RootStoreProvider } from './models/root-store'
import { setupRootStore } from './models/root-store/setup-root-store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default () => {
  const [rootStore, setRootStore] = useState()
  useEffect(() => {
    setupRootStore().then(setRootStore)
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
