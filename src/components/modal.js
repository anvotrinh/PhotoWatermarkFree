import React from 'react'
import {
  StyleSheet,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import { Colors, Metrics } from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blackOpacity(0.5),
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.space.xs,
    marginHorizontal: Metrics.space.normal,
    padding: Metrics.space.normal,
  },
})

export const Modal = ({ visible, children, onBackdropPress }) => {
  const handleBackdropPress = () => {
    Keyboard.dismiss()
    onBackdropPress && onBackdropPress()
  }

  return (
    <RNModal transparent visible={visible} hardwareAccelerated>
      <TouchableWithoutFeedback
        onPress={handleBackdropPress}
        accessible={false}
      >
        <View style={styles.container}>
          <View style={styles.content}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}
