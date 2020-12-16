import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Colors, Metrics } from '../theme'

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.whiteLilac,
    borderColor: Colors.whiteCatskill,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 15,
    minHeight: Metrics.space.big,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  inputFocus: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
})

export const Input = ({ style, onFocus, onBlur, ...otherProps }) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = e => {
    setIsFocused(true)
    if (onFocus) {
      onFocus(e)
    }
  }

  const handleBlur = e => {
    setIsFocused(false)
    if (onBlur) {
      onBlur(e)
    }
  }

  const inputStyle = [
    styles.input,
    isFocused && styles.inputFocus,
    StyleSheet.flatten(style),
  ]
  return (
    <TextInput
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...otherProps}
    />
  )
}
