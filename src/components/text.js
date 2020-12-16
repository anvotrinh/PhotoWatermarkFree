import React from 'react'
import { Text as RNText } from 'react-native'

import { StatusColor } from '../theme'

const categoryFontSize = {
  h1: 36,
  h2: 32,
  h3: 30,
  h4: 26,
  h5: 22,
  h6: 18,
  s1: 15,
  s2: 13,
  c1: 12,
}

export const Text = ({
  style,
  status = 'basic',
  category = 's1',
  children,
  ...otherProps
}) => {
  const textStyle = {
    fontSize: categoryFontSize[category],
    color: StatusColor[status],
  }
  return (
    <RNText style={[textStyle, style]} {...otherProps}>
      {children}
    </RNText>
  )
}
