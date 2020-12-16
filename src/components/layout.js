import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
})

export const Layout = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>
}
