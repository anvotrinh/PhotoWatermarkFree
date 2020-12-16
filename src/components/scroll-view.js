import React from 'react'
import { ScrollView as RNScrollView } from 'react-native'

export const ScrollView = ({ children, ...otherProps }) => (
  <RNScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    {...otherProps}
  >
    {children}
  </RNScrollView>
)
