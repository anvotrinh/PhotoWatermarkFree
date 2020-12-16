import React from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  StyleSheet,
} from 'react-native'

import { Colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
})

export const LayoutKeyboardDismiss = ({ style, children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[styles.container, style]}>{children}</View>
  </TouchableWithoutFeedback>
)
