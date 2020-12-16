import Flash, {
  hideMessage as hide,
  showMessage as show,
} from 'react-native-flash-message'

export const FlashMessage = Flash
export const hideMessage = hide

const flashOptions = {
  success: {
    type: 'success',
    message: 'Success',
  },
  error: {
    type: 'danger',
    message: 'Error',
  },
}
export const showMessage = (messageType, description) => {
  const { type, message } = flashOptions[messageType]
  return show({
    type,
    message,
    description,
  })
}
