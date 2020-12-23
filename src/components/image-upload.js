import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import { ButtonCircleIcon } from './button-circle-icon'
import { Colors } from '../theme'
import { ImagePicker } from './image-picker'

const styles = StyleSheet.create({
  btnDelete: {
    borderColor: Colors.white,
    borderWidth: 1,
    position: 'absolute',
    right: -12,
    top: -12,
  },
  image: {
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
})

export const ImageUpload = ({ source, onChange, onRemove, containerStyle }) => {
  const imagePickerRef = useRef(null)

  const handlePickImage = async () => {
    imagePickerRef.current.show()
  }

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePickImage}>
      <FastImage source={source} style={styles.image} />
      <ImagePicker ref={imagePickerRef} onChange={onChange} />
      <ButtonCircleIcon
        status='info'
        onPress={onRemove}
        size={24}
        iconPack='ant-design'
        iconName='close'
        iconColor={Colors.white}
        style={styles.btnDelete}
      />
    </TouchableOpacity>
  )
}
