import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from './text'
import { Metrics } from '../theme'
import { Icon } from './icon'

const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.space.xs,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: Metrics.space.small,
    marginBottom: Metrics.space.xs,
  },
})

export const FormRow = ({
  label,
  children,
  iconPack,
  iconName,
  error,
  errorCategory,
}) => (
  <View style={styles.container}>
    <View style={styles.labelWrapper}>
      {iconPack && iconName && <Icon pack={iconPack} name={iconName} />}
      {label && (
        <Text
          style={[styles.label, iconPack && iconName && { marginTop: 5 }]}
        >{`${label}:`}</Text>
      )}
    </View>
    {children}
    {error && (
      <Text status='danger' category={errorCategory}>
        {error}
      </Text>
    )}
  </View>
)
