import React from 'react'
import { StyleSheet, View } from 'react-native'
import RNSlider from '@react-native-community/slider'

import { Colors, Metrics } from '../theme'
import { Text } from './text'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.space.small,
  },
  slider: {
    flex: 1,
    height: Metrics.space.big,
  },
})

export const Slider = ({ text, ...otherProps }) => (
  <View style={styles.container}>
    <Text>{`${text}: `}</Text>
    <RNSlider
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor={Colors.primary}
      maximumTrackTintColor={Colors.black}
      style={styles.slider}
      {...otherProps}
    />
  </View>
)
