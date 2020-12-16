import { Image } from 'react-native'

export function getResolutionAsync(uri) {
  return new Promise(resolve => {
    Image.getSize(uri, (width, height) => {
      resolve({ width, height })
    })
  })
}
