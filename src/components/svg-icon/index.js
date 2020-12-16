import React from 'react'
import _ from 'lodash'

import config from './config'
import { Colors } from '../../theme'

export const SvgIcon = ({ name, size = 24, color = Colors.black }) => {
  const camelCaseName = _.camelCase(name)
  const className =
    camelCaseName.charAt(0).toUpperCase() + camelCaseName.substring(1)
  const iconClass = config[className]
  if (!iconClass) {
    return null
  }
  return React.createElement(iconClass, {
    width: size,
    height: size,
    fill: color,
  })
}
