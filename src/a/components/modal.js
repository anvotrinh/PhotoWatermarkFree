import React from 'react'
import {
  StyleSheet,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
} from 'react-native'
import { Colors } from '../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blackOpacity(0.5),
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
  },
})

export const Modal = ({ visible, children, onToggle }) => {
  return (
    <RNModal transparent visible={visible} hardwareAccelerated>
      <TouchableWithoutFeedback onPress={onToggle} accessible={false}>
        <View style={styles.container}>
          <View style={styles.content}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}
