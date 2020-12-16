// import { RNCamera } from 'react-native-camera'

import { PermissionLang } from '../language'

export const cameraOptions = {
  // type: RNCamera.Constants.Type.back,
  androidCameraPermissionOptions: PermissionLang.androidCamera,
  captureAudio: false,
}
