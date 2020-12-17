import { flow, getEnv, getParent, types } from 'mobx-state-tree'
import i from '../i18n'
import { URLS } from '../services/api'
import { getLocalItem, saveLocalItem, TOKEN } from '../utils/local-storage'

export const AuthStoreModel = types
  .model('AuthStore', {
    token: '',
    isLoadingLogin: false,
    isLoadingRegister: false,
    isLoadingResetPassword: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api
    },
    get rootStore() {
      return getParent(self)
    },
    get navigationStore() {
      return getParent(self).navigationStore
    },
    get userStore() {
      return getParent(self).userStore
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    login: flow(function* (data) {
      self.isLoadingLogin = true
      const result = yield self.api.post(URLS.Login, data)
      self.isLoadingLogin = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        const { token } = result
        self.token = token
        self.api.setup(token)
        saveLocalItem(TOKEN, token)
        yield self.userStore.getProfile()
        self.navigationStore.replace({ routeName: 'Home' })
      }
    }),
    register: flow(function* (data) {
      self.isLoadingRegister = true
      const result = yield self.api.post(URLS.Register, data)
      self.isLoadingRegister = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.navigationStore.replace({ routeName: 'Login' })
      }
    }),
    resetPassword: flow(function* (data) {
      self.isLoadingResetPassword = true
      const result = yield self.api.post(URLS.ResetPassword, data)
      self.isLoadingResetPassword = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('reset_password_success'))
        self.navigationStore.goBack()
      }
    }),
    setup: flow(function* () {
      const token = yield getLocalItem(TOKEN)
      if (token) {
        self.token = token
        self.api.setup(token)
        yield self.userStore.getProfile()
        self.navigationStore.replace({ routeName: 'Home' })
      } else {
        self.navigationStore.replace({ routeName: 'AuthHome' })
      }
    }),
    logout() {
      self.rootStore.reset()
      saveLocalItem(TOKEN, '')
      self.navigationStore.popToTop()
      self.navigationStore.replace({ routeName: 'AuthHome' })
    },
  }))
