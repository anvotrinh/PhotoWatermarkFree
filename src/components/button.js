import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { Icon } from './icon'
import { Text } from './text'
import { Colors, StatusColor } from '../theme'
import { opacityFunction } from '../utils/color'

const sizeFontSize = {
  tiny: 10,
  small: 12,
  medium: 14,
  large: 16,
  giant: 18,
}

const sizePadding = {
  tiny: 6,
  small: 8,
  medium: 12,
  large: 14,
  giant: 16,
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
  },
})

export const Button = ({
  text = '',
  status = 'primary',
  size = 'medium',
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
    padding: sizePadding[size],
    opacity: disabled ? 0.6 : 1,
  }
  if (outline) {
    btnStyle.borderWidth = 1
    btnStyle.borderColor = StatusColor[status]
    btnStyle.backgroundColor = opacityFunction(StatusColor[status])(0.08)
  } else if (!ghost) {
    btnStyle.backgroundColor = StatusColor[status]
  }
  const textStyle = {
    color: outline || ghost ? StatusColor[status] : Colors.white,
    fontSize: sizeFontSize[size],
  }

  const finalBtnStyle = [styles.btn, btnStyle, StyleSheet.flatten(style)]
  return (
    <TouchableOpacity disabled={disabled} style={finalBtnStyle} {...otherProps}>
      {iconPack && iconName && (
        <Icon
          pack={iconPack}
          name={iconName}
          color={iconColor || textStyle.color}
          size={iconSize || sizeFontSize[size] * 1.5}
        />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}
