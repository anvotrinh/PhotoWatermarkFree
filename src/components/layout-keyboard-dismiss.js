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
    flex: 1,
    backgroundColor: Colors.white,
  },
})

export const LayoutKeyboardDismiss = ({ style, children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[styles.container, style]}>{children}</View>
  </TouchableWithoutFeedback>
)
