import AsyncStorage from '@react-native-community/async-storage'

export const TOKEN = 'token'
export const WATERMARK = 'watermark'

export const getLocalItem = async key => {
  const itemStr = await AsyncStorage.getItem(key)
  try {
    return JSON.parse(itemStr)
  } catch (e) {
    return itemStr
  }
}

export const saveLocalItem = async (key, item) => {
  const itemStr = JSON.stringify(item)
  return await AsyncStorage.setItem(key, itemStr)
}
