import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'

import { Button } from './button'
import { Text } from './text'
import { useStores } from '../models/root-store'
import { CommonStyles, Colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    ...CommonStyles.shadow,
    zIndex: 1,
  },
  titleWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
})

export const Header = observer(({ title, onBack, hasBack = true }) => {
  const {
    navigationStore: { goBack },
  } = useStores()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    goBack()
  }

  return (
    <View style={styles.container}>
      {hasBack && (
        <Button
          onPress={handleBack}
          ghost
          iconPack='ant-design'
          iconName='arrowleft'
        />
      )}
      <View style={styles.titleWrapper}>
        <Text category='h5'>{title}</Text>
      </View>
    </View>
  )
})
