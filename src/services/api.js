import { API_URL, TIMEOUT } from 'react-native-dotenv'

import { logRequest, logResponse } from '../utils/cli'

export const URLS = {
  Test: '/test',
  Login: '/api/auth/login',
  Register: '/api/auth/register',
  ResetPassword: '/api/auth/resetPassword',
  Me: '/api/v1/me',
  ResendVerifyEmail: '/api/v1/resendVerifyEmail',
  Image: '/api/v1/image',
  Product: '/api/v1/product',
}

const _fetchTimeout = (url, options) => {
  let didTimeOut = false
  return new Promise(function (resolve, reject) {
    const timeout = setTimeout(function () {
      didTimeOut = true
      reject('timeout')
    }, parseInt(TIMEOUT, 10))

    fetch(url, options)
      .then(function (response) {
        clearTimeout(timeout)
        if (!didTimeOut) {
          resolve(response)
        }
      })
      .catch(function (err) {
        // Rejection already happened with setTimeout
        if (didTimeOut) {
          return
        }
        // Reject with error
        reject(err)
      })
  })
}

const _http = ({ url, method, headers, data, token, isFormData }) => {
  logRequest({ method, url, data })
  headers = headers || {}
  headers.pragma = 'no-cache'
  headers['cache-control'] = 'no-cache'

  if (token) {
    headers.Authorization = 'Bearer ' + token
  }
  const options = {
    method,
    headers,
  }
  if (data) {
    if (isFormData) {
      options.body = data
    } else {
      options.body = JSON.stringify(data)
    }
  }

  return _fetchTimeout(API_URL + url, options)
    .then(res => res.json())
    .then(data => {
      logResponse({ method, url, data })
      return data
    })
    .catch(err => {
      if (err instanceof TypeError || err === 'timeout') {
        logResponse({ method, url, error: 'No Connection' })
        return Promise.resolve({ error: 'No Connection' })
      }
      logResponse({ method, url, error: err.message })
      return Promise.resolve({ error: err.message })
    })
}

export default class API {
  token = ''

  setup = token => {
    this.token = token
  }

  get = (url, params) => {
    let query = ''
    if (params) {
      query = Object.keys(params)
        .map((key, i) => {
          const value = params[key]
          return `${i === 0 ? '?' : '&'}${key}=${value}`
        })
        .join('')
    }
    return _http({
      url: url + query,
      method: 'GET',
      token: this.token,
    })
  }

  post = (url, data) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return _http({
      url,
      method: 'POST',
      headers,
      data,
      token: this.token,
    })
  }

  delete = url => {
    return _http({
      url,
      method: 'DELETE',
      token: this.token,
    })
  }

  uploadImageByUris = uris => {
    if (uris.length === 0) {
      return Promise.resolve([])
    }
    const promises = uris.map(uri =>
      this.uploadImageByUri(uri).then(result => result.link),
    )
    return Promise.all(promises)
  }

  uploadImageByUri = uri => {
    if (!uri) {
      return Promise.resolve({ link: '' })
    } else if (uri.startsWith('http')) {
      return Promise.resolve({ link: uri })
    }
    const formData = new FormData()
    formData.append('image', {
      uri,
      name: 'image-name.png',
      type: 'image/png',
    })
    return this.postFormData(URLS.Image, formData)
  }

  postFormData = (url, formData) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    return _http({
      url,
      method: 'POST',
      headers,
      data: formData,
      token: this.token,
      isFormData: true,
    })
  }

  put = (url, data) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return _http({
      url,
      method: 'PUT',
      headers,
      data,
      token: this.token,
    })
  }
}
