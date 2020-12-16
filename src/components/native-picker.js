import React, { useState, useEffect } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import i from '../i18n'
import { Button } from './button'
import { Colors, Metrics } from '../theme'
import { Modal } from './modal'

const styles = StyleSheet.create({
  modalBtn: {
    flex: 1,
    marginHorizontal: Metrics.space.xs,
  },
  modalBtnWrapper: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  modalPicker: {
    backgroundColor: Colors.white,
  },
})

const IOSPicker = ({ value, onChange, ...otherProps }) => {
  const [date, setDate] = useState(value)

  useEffect(() => {
    setDate(value)
  }, [value])

  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate)
  }

  const handleCancel = () => {
    onChange(null)
  }

  const handleOK = () => {
    onChange(date)
  }

  return (
    <Modal visible>
      <DateTimePicker
        value={date}
        onChange={handleDateChange}
        style={styles.modalPicker}
        {...otherProps}
      />
      <View style={styles.modalBtnWrapper}>
        <Button text={i.get('ok')} onPress={handleOK} style={styles.modalBtn} />
        <Button
          text={i.get('cancel')}
          onPress={handleCancel}
          outline
          style={styles.modalBtn}
        />
      </View>
    </Modal>
  )
}

export const NativePicker = ({ onChange, ...otherProps }) => {
  if (Platform.OS === 'ios') {
    return <IOSPicker {...otherProps} onChange={onChange} />
  }
  return (
    <DateTimePicker
      {...otherProps}
      onChange={(event, selectedDate) => onChange(selectedDate)}
    />
  )
}
