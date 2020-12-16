import { flow, getEnv, types, getParent } from 'mobx-state-tree'

import i from '../i18n'
import { URLS } from '../services/api'

export const defaultUserProfile = {
  email: '',
  name: '',
  birthday: '',
  is_verified_email: false,
  avatar_url: '',
}

export const UserProfileModel = types.model('UserProfile', {
  email: types.string,
  name: types.optional(types.string, ''),
  birthday: types.optional(types.string, ''),
  is_verified_email: types.optional(types.boolean, false),
  avatar_url: types.optional(types.string, ''),
})

export const UserStoreModel = types
  .model('UserStore', {
    profile: types.optional(UserProfileModel, defaultUserProfile),
    isLoadingGetProfile: false,
    isLoadingUpdateProfile: false,
    isLoadingChangePassword: false,
    isLoadingResendVerifyEmail: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api
    },
    get navigationStore() {
      return getParent(self).navigationStore
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getProfile: flow(function* () {
      self.isLoadingGetProfile = true
      const result = yield self.api.get(URLS.Me)
      self.isLoadingGetProfile = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.profile = result
      }
    }),
    updateProfile: flow(function* (data, onSuccess) {
      self.isLoadingUpdateProfile = true
      if (data.avatar) {
        const imageResult = yield self.api.uploadImageByUri(data.avatar.uri)
        data.avatar_url = imageResult.link
      }
      delete data.avatar
      const result = yield self.api.put(URLS.Me, data)
      self.isLoadingUpdateProfile = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        if (onSuccess) {
          onSuccess()
        }
        self.profile = result
      }
    }),
    changePassword: flow(function* (data) {
      self.isLoadingChangePassword = true
      const result = yield self.api.put(URLS.Me, data)
      self.isLoadingChangePassword = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('change_password_success'))
        self.navigationStore.goBack()
      }
    }),
    resendVerifyEmail: flow(function* () {
      self.isLoadingResendVerifyEmail = true
      const result = yield self.api.post(URLS.ResendVerifyEmail)
      self.isLoadingResendVerifyEmail = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('resend_verify_email_success'))
      }
    }),
  }))
