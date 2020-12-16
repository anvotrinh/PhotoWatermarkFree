import React from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

import { Icon } from './icon'
import { Colors } from '../theme'

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const Avatar = ({ source, size, selected, bgColor }) => {
  const iconSize = size * 0.9
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }
  if (selected) {
    avatarStyle.borderWidth = size * 0.05
    avatarStyle.borderColor =
      selected === 'selected' ? Colors.primary : Colors.white
  }
  if (source) {
    return <FastImage style={[styles.avatar, avatarStyle]} source={source} />
  } else {
    avatarStyle.backgroundColor = bgColor || Colors.gray
  }
  return (
    <View style={[styles.avatar, avatarStyle]}>
      <Icon
        pack='material'
        name='person-outline'
        size={iconSize}
        color={Colors.white}
      />
    </View>
  )
}
