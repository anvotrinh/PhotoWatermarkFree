import { opacityFunction } from '../utils/color'

const basicColors = {
  primary: '#F8A1B9',
  green: '#00E096',
  red: '#FF3D71',
  orange: '#FFAA00',
  basic: '#222B45',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#BCBDBE',
  dark: '#0A1646',
  whiteLilac: '#F7F9FC',
  whiteCatskill: '#E4E9F2',
  blueTropical: '#B6DDF4',
  baliHai: '#8F9BB3',
  brilliantRose: '#F652A0',
  deepBlush: '#E16A88',
}

export const Colors = (() => {
  for (const colorName in basicColors) {
    basicColors[`${colorName}Opacity`] = opacityFunction(basicColors[colorName])
  }
  return basicColors
})()

export const StatusColor = {
  primary: Colors.primary,
  success: Colors.green,
  warning: Colors.orange,
  danger: Colors.red,
  basic: Colors.basic,
  info: Colors.gray,
}
