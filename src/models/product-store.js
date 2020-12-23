import { flow, getEnv, types, getParent } from 'mobx-state-tree'

import i from '../i18n'
import { URLS } from '../services/api'

export const ProductModel = types
  .model('Product', {
    id: types.string,
    name: types.string,
    price: types.number,
    image_urls: types.string,
    stocks: types.string,
  })
  .actions(self => ({
    update(data) {
      for (const key in data) {
        self[key] = data[key]
      }
    },
  }))

export const ProductStoreModel = types
  .model('ProductStore', {
    products: types.optional(types.array(ProductModel), []),
    isLoadingListProduct: false,
    isLoadingAddProduct: false,
    isLoadingUpdateProduct: false,
    isLoadingDeleteProduct: false,
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
    getProducts: flow(function* () {
      self.isLoadingListProduct = true
      const result = yield self.api.get(URLS.Product)
      self.isLoadingListProduct = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.products = result
      }
    }),
    addProduct: flow(function* (data) {
      self.isLoadingAddProduct = true
      const product = yield self.convertProductParam(data)
      const result = yield self.api.post(URLS.Product, product)
      self.isLoadingAddProduct = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('add_product_success'))
        self.products.push(result)
        self.navigationStore.goBack()
      }
    }),
    updateProduct: flow(function* (productId, data) {
      self.isLoadingUpdateProduct = true
      const product = yield self.convertProductParam(data)
      const result = yield self.api.put(`${URLS.Product}/${productId}`, product)
      self.isLoadingUpdateProduct = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.showMessage('success', i.get('update_product_success'))
        const productIndex = self.products.findIndex(c => c.id === productId)
        self.products[productIndex].update(result)
        self.navigationStore.goBack()
      }
    }),
    deleteProduct: flow(function* (productId) {
      self.isLoadingDeleteProduct = true
      const result = yield self.api.delete(`${URLS.Product}/${productId}`)
      self.isLoadingDeleteProduct = false
      if (result.error) {
        self.showMessage('error', result.error)
      } else {
        self.products = self.products.filter(c => c.id !== productId)
        self.navigationStore.goBack()
      }
    }),
    convertProductParam: flow(function* (data) {
      const stocks = []
      const promises = data.variations.map(variation => {
        stocks.push(variation.stock)
        return self.api.uploadImageByUri(variation.image.uri)
      })
      const imageResults = yield Promise.all(promises)
      return {
        name: data.name,
        price: parseInt(data.price, 10),
        image_urls: imageResults.map(imageResult => imageResult.link).join(','),
        stocks: stocks.join(','),
      }
    }),
  }))
