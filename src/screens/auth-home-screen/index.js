import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'

import i from '../../i18n'
import { useStores } from '../../models/root-store'
import { Button } from '../../components'
import { Colors, Metrics } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.space.normal,
    backgroundColor: Colors.white,
  },
  space: {
    flex: 1,
  },
  btn: {
    marginBottom: Metrics.space.small,
  },
})

export default observer(() => {
  const {
    navigationStore: { navigateTo },
  } = useStores()

  const handleLoginPress = () => {
    navigateTo({ routeName: 'Login' })
  }

  const handleRegisterPress = () => {
    navigateTo({ routeName: 'Register' })
  }

  return (
    <View style={styles.container}>
      <View style={styles.space} />
      <Button
        text={i.get('login')}
        size='large'
        onPress={handleLoginPress}
        style={styles.btn}
      />
      <Button
        text={i.get('register')}
        size='large'
        onPress={handleRegisterPress}
        style={styles.btn}
      />
    </View>
  )
})
