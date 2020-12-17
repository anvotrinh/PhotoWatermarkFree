import AsyncStorage from '@react-native-community/async-storage'

export const TOKEN = 'token'
export const WATERMARK = 'watermark'

export const getLocalItem = async key => {
  return await AsyncStorage.getItem(key)
}

export const saveLocalItem = async (key, token) => {
  return await AsyncStorage.setItem(key, token)
}
