import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { Colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOpacity(0.5),
    zIndex: 1,
  },
})

export const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  )
}
