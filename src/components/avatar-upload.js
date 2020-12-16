import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'

import { Avatar } from './avatar'
import { ButtonCircleIcon } from './button-circle-icon'
import { Colors } from '../theme'
import { ImagePicker } from './image-picker'

const styles = StyleSheet.create({
  btnEdit: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
})

export const AvatarUpload = ({
  source,
  title,
  onChange,
  size,
  containerStyle,
}) => {
  const imagePickerRef = useRef(null)

  const handlePickImage = async () => {
    imagePickerRef.current.show({
      cropping: true,
      enableRotationGesture: false,
      width: 400,
      height: 400,
    })
  }

  const iconSize = size / 2.5
  return (
    <View style={containerStyle}>
      <Avatar source={source} size={size} />
      <ButtonCircleIcon
        onPress={handlePickImage}
        size={iconSize}
        iconPack='material'
        iconName='edit'
        iconColor={Colors.white}
        style={styles.btnEdit}
      />
      <ImagePicker ref={imagePickerRef} title={title} onChange={onChange} />
    </View>
  )
}
