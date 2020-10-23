import RNFS from 'react-native-fs';
import {Image, Platform} from 'react-native';

const TEMP_PATH =
  RNFS.TemporaryDirectoryPath + (Platform.OS === 'ios' ? '' : '/');

export function toFullLocalPath(path) {
  if (!path.startsWith('file://')) {
    return `file://${path}`;
  }
  return path;
}

export function generateTempPath(fileName) {
  return toFullLocalPath(TEMP_PATH + fileName);
}

export function getResolutionAsync(uri) {
  return new Promise((resolve) => {
    Image.getSize(uri, (width, height) => {
      resolve({width, height});
    });
  });
}
