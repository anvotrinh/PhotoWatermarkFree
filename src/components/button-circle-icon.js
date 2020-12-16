import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Icon } from './icon'
import { StatusColor } from '../theme'
import { opacityFunction } from '../utils/color'

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const ButtonCircleIcon = ({
  status = 'primary',
  size = 20,
  iconPack,
  iconName,
  iconColor,
  iconSize,
  outline = false,
  ghost = false,
  disabled = false,
  style,
  ...otherProps
}) => {
  const btnStyle = {
    opacity: disabled ? 0.6 : 1,
    width: size,
    height: size,
    borderRadius: size * 0.5,
  }
  if (outline) {
    btnStyle.borderWidth = 1
    btnStyle.borderColor = StatusColor[status]
    btnStyle.backgroundColor = opacityFunction(StatusColor[status])(0.08)
  } else if (!ghost) {
    btnStyle.backgroundColor = StatusColor[status]
  }
  const finalBtnStyle = [styles.btn, btnStyle, StyleSheet.flatten(style)]

  return (
    <TouchableOpacity style={finalBtnStyle} {...otherProps}>
      <Icon
        pack={iconPack}
        name={iconName}
        size={iconSize || size * 0.7}
        color={iconColor}
      />
    </TouchableOpacity>
  )
}
