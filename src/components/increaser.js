import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from './input'
import { Button } from './button'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    borderRadius: 0,
    flex: 1,
    textAlign: 'center',
  },
})

export const Increaser = ({ value, onChange }) => {
  const handleMinusPress = () => {
    const newValue = parseInt(value, 10) - 1 + ''
    onChange(newValue)
  }
  const handlePlusPress = () => {
    const newValue = parseInt(value, 10) + 1 + ''
    onChange(newValue)
  }
  return (
    <View style={styles.container}>
      <Button
        iconName='minus'
        iconPack='ant-design'
        onPress={handleMinusPress}
      />
      <Input
        style={styles.input}
        value={value}
        onChangeText={v => onChange(v)}
        keyboardType='numeric'
      />
      <Button iconName='plus' iconPack='ant-design' onPress={handlePlusPress} />
    </View>
  )
}
