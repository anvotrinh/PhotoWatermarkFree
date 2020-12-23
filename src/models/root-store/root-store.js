import { types, getSnapshot, applySnapshot } from 'mobx-state-tree'

import { AuthStoreModel } from '../auth-store'
import { UserStoreModel } from '../user-store'
import { NavigationStoreModel } from '../navigation-store'
import { ProductStoreModel } from '../product-store'
import { WatermarkStoreModel } from '../watermark-store'

export const RootStoreModel = types
  .model('RootStore')
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    authStore: types.optional(AuthStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    productStore: types.optional(ProductStoreModel, {}),
    watermarkStore: types.optional(WatermarkStoreModel, {}),
  })
  .actions(self => {
    let initialState = {}
    return {
      afterCreate() {
        initialState = getSnapshot(self)
      },
      reset() {
        applySnapshot(self, initialState)
      },
    }
  })
