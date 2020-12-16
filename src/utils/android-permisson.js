import { PermissionsAndroid, Platform } from 'react-native'
import { PermissionLang } from '../language'

export async function requestStoragePermission() {
  if (Platform.OS === 'ios') {
    return true
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionLang.androidStorage,
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch {
    return false
  }
}
