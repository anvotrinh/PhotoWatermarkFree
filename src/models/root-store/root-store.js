import { types, getSnapshot, applySnapshot } from 'mobx-state-tree'

import { AuthStoreModel } from '../auth-store'
import { UserStoreModel } from '../user-store'
import { NavigationStoreModel } from '../navigation-store'
import { ChildStoreModel } from '../child-store'

export const RootStoreModel = types
  .model('RootStore')
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    authStore: types.optional(AuthStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    childStore: types.optional(ChildStoreModel, {}),
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
