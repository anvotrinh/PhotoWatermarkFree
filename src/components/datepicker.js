import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Text } from './text'
import { Icon } from './icon'
import { NativePicker } from './native-picker'
import { Colors, Metrics } from '../theme'
import { formatDate } from '../utils/date'

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: Colors.whiteLilac,
    borderColor: Colors.whiteCatskill,
    borderRadius: Metrics.space.xs,
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.space.medium,
  },
  textBtn: {
    marginRight: Metrics.space.xs,
    marginTop: 4,
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
