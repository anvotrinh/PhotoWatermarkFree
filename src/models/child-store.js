import { flow, getEnv, types, getParent } from 'mobx-state-tree'

import i from '../i18n'
import { URLS } from '../services/api'
import { sortByOrder } from '../utils/array'

export const ChildModel = types
  .model('Child', {
    id: types.string,
    avatar_url: types.optional(types.string, ''),
    name: types.string,
    birthday: types.string,
    gender: types.string,
    color: types.string,
    order: types.number,
  })
  .actions(self => ({
    update(data) {
      for (const key in data) {
        self[key] = data[key]
      }
    },
  }))

export const ChildStoreModel = types
  .model('ChildStore', {
    childs: types.array(ChildModel),
    isLoadingListChild: false,
    isLoadingAddChild: false,
    isLoadingUpdateChild: false,
    isLoadingDeleteChild: false,
    isLoadingChangeOrder: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api
    },
    get navigationStore() {
      return getParent(self).navigationStore
    },
    get printStore() {
      return getParent(self).printStore
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getChilds: flow(function* () {
      self.isLoadingListChild = true
      const result = yield self.api.get(URLS.Child)
      self.isLoadingListChild = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.childs = sortByOrder(result)
      }
    }),
    addChild: flow(function* (data) {
      self.isLoadingAddChild = true
      if (data.avatar) {
        const imageResult = yield self.api.uploadImageByUri(data.avatar.uri)
        data.avatar_url = imageResult.link
      }
      delete data.avatar
      const result = yield self.api.post(URLS.Child, data)
      self.isLoadingAddChild = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('add_child_success'))
        self.childs.push(result)
        self.navigationStore.goBack()
      }
    }),
    updateChild: flow(function* (childId, data) {
      self.isLoadingUpdateChild = true
      if (data.avatar) {
        const imageResult = yield self.api.uploadImageByUri(data.avatar.uri)
        data.avatar_url = imageResult.link
      }
      delete data.avatar
      const result = yield self.api.put(`${URLS.Child}/${childId}`, data)
      self.isLoadingUpdateChild = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('update_child_success'))
        const childIndex = self.childs.findIndex(c => c.id === childId)
        self.childs[childIndex].update(result)
        self.navigationStore.goBack()
      }
    }),
    changeOrder: flow(function* (childIds) {
      self.isLoadingChangeOrder = true
      const result = yield self.api.put(`${URLS.Child}/order`, {
        child_ids: childIds,
      })
      self.isLoadingChangeOrder = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.childs = sortByOrder(result)
      }
    }),
    deleteChild: flow(function* (childId) {
      self.isLoadingDeleteChild = true
      const result = yield self.api.delete(`${URLS.Child}/${childId}`)
      self.isLoadingDeleteChild = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.childs = self.childs.filter(c => c.id !== childId)
        self.printStore.alterDeleteChild(childId)
        self.navigationStore.goBack()
      }
    }),
  }))
