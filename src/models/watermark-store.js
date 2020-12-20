import { flow, getEnv, getParent, types } from 'mobx-state-tree'

import { getLocalItem, saveLocalItem, WATERMARK } from '../utils/local-storage'
import logoBase64 from '../svgs/logo'

export const WatermarkStoreModel = types
  .model('WatermarkStore', {
    logo: logoBase64,
    title: 'Your text',
    orderPrefix: 'Photo',
    imgUris: types.optional(types.array(types.string), []),
    xPercent: 0,
    yPercent: 0,
    fontSize: 20,
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
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    loadData: flow(function* () {
      const data = yield getLocalItem(WATERMARK)
      if (!data) return
      const { logo, title, orderPrefix } = data
      self.logo = logo
      self.title = title
      self.orderPrefix = orderPrefix
    }),
    saveData: flow(function* () {
      const data = {
        logo: self.logo,
        title: self.title,
        orderPrefix: self.orderPrefix,
      }
      yield saveLocalItem(WATERMARK, data)
    }),
    updateData: flow(function* (data) {
      for (const key in data) {
        self[key] = data[key]
      }
      yield self.saveData()
    }),
  }))
