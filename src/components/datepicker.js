import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Text } from './text'
import { Icon } from './icon'
import { NativePicker } from './native-picker'
import { Colors, Metrics } from '../theme'
import { formatDate } from '../utils/date'

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.space.medium,
    backgroundColor: Colors.whiteLilac,
    borderColor: Colors.whiteCatskill,
    borderWidth: 1,
    height: 48,
    borderRadius: Metrics.space.xs,
  },
  textBtn: {
    marginTop: 4,
    marginRight: Metrics.space.xs,
  },
})

export const Datepicker = ({ value, onChange, style, ...otherProps }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleDateChange = selectedDate => {
    setModalVisible(false)
    if (!selectedDate) {
      return
    }
    onChange(selectedDate)
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.btn, StyleSheet.flatten(style)]}
      >
        <Text style={styles.textBtn}>{formatDate(value)}</Text>
        <Icon
          pack='ant-design'
          name='calendar'
          size={Metrics.space.normal}
          color={Colors.gray}
        />
      </TouchableOpacity>
      {modalVisible && (
        <NativePicker
          value={value}
          onChange={handleDateChange}
          mode='date'
          {...otherProps}
        />
      )}
    </>
  )
}
