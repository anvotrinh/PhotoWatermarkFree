import React from 'react'
import { observer } from 'mobx-react-lite'

import i from '../../i18n'
import WatermarkOption from './watermark-option'
import { Header, Layout } from '../../components'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default observer(() => {
  return <WatermarkOption />
})
