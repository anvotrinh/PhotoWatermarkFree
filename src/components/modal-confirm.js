import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from './button'
import { Text } from './text'
import { Modal } from './modal'
import { Metrics } from '../theme'

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginHorizontal: Metrics.space.xs,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: Metrics.space.medium,
  },
  title: {
    textAlign: 'center',
  },
})

export const ModalConfirm = ({
  visible,
  title,
  positiveText,
  negativeText,
  onExecute,
  onCancel,
}) => {
  return (
    <Modal visible={visible}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.btnWrapper}>
        <Button
          text={positiveText}
          size='large'
          onPress={onExecute}
          style={styles.btn}
        />
        <Button
          text={negativeText}
          size='large'
          outline
          onPress={onCancel}
          style={styles.btn}
        />
      </View>
    </Modal>
  )
}
