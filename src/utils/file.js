import RNFS from 'react-native-fs'
import { Platform } from 'react-native'

const TEMP_PATH =
  RNFS.TemporaryDirectoryPath + (Platform.OS === 'ios' ? '' : '/')

export function toFullLocalPath(path) {
  if (!path.startsWith('file://')) {
    return `file://${path}`
  }
  return path
}

export function removeFilePath(path) {
  if (path.startsWith('file://')) {
    return path.substring(7)
  }
  return path
}

export function isFullLocalPath(path) {
  return path.startsWith('file://')
}

export function getFileName(fileName) {
  const parts = fileName.split('.')
  if (parts.length === 1) {
    return { name: fileName }
  }
  const ext = parts[parts.length - 1]
  return {
    name: fileName.substring(0, fileName.length - ext.length - 1),
    ext,
  }
}

export function generateTempPath(path) {
  const parts = path.split('/')
  const { name, ext } = getFileName(parts[parts.length - 1])
  const extPart = ext ? `.${ext}` : ''
  const tempPath = TEMP_PATH + `${name}-${new Date().getTime()}${extPart}`
  return toFullLocalPath(tempPath)
}

export function downloadToLocal(path) {
  if (isFullLocalPath(path)) {
    return Promise.resolve(path)
  } else {
    const newPath = generateTempPath(path)
    const { promise } = RNFS.downloadFile({
      fromUrl: path,
      toFile: newPath,
    })
    return promise.then(() => newPath)
  }
}

export function downloadToLocals(paths) {
  const promises = paths.map(path => {
    return downloadToLocal(path)
  })
  return Promise.all(promises)
}
