import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from './text'
import { Metrics } from '../theme'
import { Icon } from './icon'

const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.space.xs,
  },
  icon: {
    marginTop: 5,
  },
  label: {
    marginBottom: Metrics.space.xs,
    marginRight: Metrics.space.small,
  },
  labelWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export const FormRow = ({
  label,
  children,
  iconPack,
  iconName,
  error,
  errorCategory,
  containerStyle,
  labelStyle,
}) => (
  <View style={[styles.container, StyleSheet.flatten(containerStyle)]}>
    <View style={styles.labelWrapper}>
      {iconPack && iconName && <Icon pack={iconPack} name={iconName} />}
      {label && (
        <Text
          style={[
            styles.label,
            iconPack && iconName && styles.icon,
            StyleSheet.flatten(labelStyle),
          ]}
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
