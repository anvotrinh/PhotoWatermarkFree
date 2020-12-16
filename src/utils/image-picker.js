import ImageCropPicker from 'react-native-image-crop-picker'

import { showMessage } from '../components/flash-message'
import { toFullLocalPath } from './file'

const defaultOptions = { compressImageQuality: 0.5, mediaType: 'photo' }

export async function openCamera(options) {
  let image = null
  try {
    image = await ImageCropPicker.openCamera({
      ...defaultOptions,
      ...options,
    })
    image.path = toFullLocalPath(image.path)
  } catch (e) {
    showMessage('error', e.message)
  }
  return image
}

export async function openPicker(options) {
  let image = null
  try {
    image = await ImageCropPicker.openPicker({
      ...defaultOptions,
      ...options,
    })
    image.path = toFullLocalPath(image.path)
  } catch (e) {
    if (e.message !== 'User cancelled image selection') {
      showMessage('error', e.message)
    }
  }
  return image
}
