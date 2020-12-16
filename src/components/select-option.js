import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { Text } from './text'
import { Icon } from './icon'
import { Metrics, Colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    marginHorizontal: Metrics.space.small,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.space.normal,
    height: Metrics.space.normal,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: Colors.grayOpacity(0.08),
    borderColor: Colors.gray,
  },
  checkBoxContentChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkBoxLabel: {
    marginHorizontal: 12,
  },
})

export const CheckBox = ({ text, checked, onChange, style }) => {
  return (
    <TouchableOpacity
      style={[styles.checkBox, StyleSheet.flatten(style)]}
      onPress={onChange}
    >
      <View
        style={[
          styles.checkBoxContent,
          checked && styles.checkBoxContentChecked,
        ]}
      >
        {checked && (
          <Icon
            pack='font-awesome'
            name='check'
            size={12}
            color={Colors.white}
          />
        )}
      </View>
      <Text style={styles.checkBoxLabel}>{text}</Text>
    </TouchableOpacity>
  )
}

export const SelectOption = ({ data, value, onChange }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <CheckBox
          key={index}
          text={item.label}
          checked={value === item.value}
          onChange={() => onChange(item.value)}
          style={styles.item}
        />
      ))}
    </View>
  )
}
