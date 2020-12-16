import React from 'react'
import { TouchableOpacity, StyleSheet, Keyboard, View } from 'react-native'

import { Metrics, Colors, SelectColors } from '../../../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    marginHorizontal: Metrics.space.small,
    width: Metrics.space.big,
    height: Metrics.space.big,
    borderColor: Colors.primary,
  },
})

const SelectColorItem = ({ color, selectedColor, onPress }) => {
  const style = {
    backgroundColor: color,
    borderWidth: color === selectedColor ? Metrics.space.xs : 0,
  }
  return (
    <TouchableOpacity
      onPress={() => onPress(color)}
      style={[styles.item, style]}
    />
  )
}

export default ({ value, onChange }) => {
  const handleItemPress = color => {
    onChange(color)
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      {SelectColors.map(color => (
        <SelectColorItem
          key={color}
          color={color}
          selectedColor={value}
          onPress={handleItemPress}
        />
      ))}
    </View>
  )
}
