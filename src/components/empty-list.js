import React from 'react'
import { View, StyleSheet } from 'react-native'

import i from './../i18n'
import { Text } from './text'
import { Icon } from './icon'
import { Metrics, Colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.space.xs,
  },
  description: {
    color: Colors.gray,
    marginTop: Metrics.space.xs,
  },
})

export const EmptyList = ({ description = i.get('empty_list'), isLoading }) => {
  if (isLoading) {
    return null
  }
  return (
    <View style={styles.container}>
      <Icon
        pack='font-awesome'
        name='inbox'
        size={Metrics.space.xLarge}
        color={Colors.gray}
      />
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}
