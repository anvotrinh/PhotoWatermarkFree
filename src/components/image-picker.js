import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import i from '../i18n'
import { Modal } from './modal'
import { Metrics } from '../theme'
import { Button } from './button'
import { Text } from './text'
import { openPicker, openCamera } from '../utils/image-picker'

const styles = StyleSheet.create({
  btn: {
    marginVertical: Metrics.space.xs,
    justifyContent: 'space-between',
  },
  btnCancel: {
    marginVertical: Metrics.space.xs,
  },
  title: {
    textAlign: 'center',
    marginBottom: Metrics.space.xs,
  },
})

export class ImagePicker extends Component {
  state = {
    visible: false,
  }

  show = options => {
    this.options = options
    this.setState({ visible: true })
  }

  handleTakePhoto = async () => {
    const image = await openCamera(this.options)
    if (!image) {
      return
    }
    this.props.onChange({ uri: image.path })
    this.setState({ visible: false })
  }

  handleChooseFromLibrary = async () => {
    const image = await openPicker(this.options)
    if (!image) {
      return
    }
    this.props.onChange({ uri: image.path })
    this.setState({ visible: false })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state
    const { title = i.get('image_picker') } = this.props
    return (
      <Modal visible={visible}>
        <Text category='h6' style={styles.title}>
          {title}
        </Text>
        <Button
          text={i.get('take_photo')}
          iconPack='feather'
          iconName='camera'
          outline
          onPress={this.handleTakePhoto}
          style={styles.btn}
        />
        <Button
          text={i.get('choose_from_library')}
          iconPack='material'
          iconName='photo-library'
          outline
          onPress={this.handleChooseFromLibrary}
          style={styles.btn}
        />
        <Button
          text={i.get('cancel')}
          status='basic'
          outline
          onPress={this.handleCancel}
          style={styles.btnCancel}
        />
      </Modal>
    )
  }
}
