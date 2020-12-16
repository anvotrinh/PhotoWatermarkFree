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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.blackOpacity(0.5),
  },
  content: {
    marginHorizontal: Metrics.space.normal,
    padding: Metrics.space.normal,
    backgroundColor: Colors.white,
    borderRadius: Metrics.space.xs,
  },
})

export const Modal = ({ visible, children }) => {
  return (
    <RNModal transparent visible={visible} hardwareAccelerated>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.content}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}
