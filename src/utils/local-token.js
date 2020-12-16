import AsyncStorage from '@react-native-community/async-storage'

const TOKEN = 'token'

export const getLocalToken = async () => {
  return await AsyncStorage.getItem(TOKEN)
}

export const saveLocalToken = async token => {
  return await AsyncStorage.setItem(TOKEN, token)
}
