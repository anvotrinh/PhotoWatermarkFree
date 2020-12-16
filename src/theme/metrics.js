import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const Metrics = {
  space: {
    xs: 5,
    minor: 8,
    small: 10,
    regular: 12,
    medium: 16,
    normal: 20,
    big: 40,
    large: 50,
    xLarge: 80,
  },
  screenWidth: width,
  screenHeight: height,
}
