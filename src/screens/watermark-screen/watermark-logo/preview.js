import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import i from '../../../i18n'
import { getResolutionAsync } from '../../../utils/image'
import { Slider, Header, Layout, Text } from '../../../components'
import { Colors, Metrics } from '../../../theme'
import { useStores } from '../../../models/root-store'
import { CODE_X_PERCENT, CODE_Y_PERCENT } from './config'

const styles = StyleSheet.create({
  code: {
    color: Colors.brilliantRose,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    position: 'absolute',
  },
  imgContent: {
    flex: 1,
  },
  imgWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  logoTitle: {
    color: Colors.brilliantRose,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginTop: Metrics.space.xs,
  },
  logoWrapper: {
    alignItems: 'center',
    padding: 3,
    position: 'absolute',
  },
})

export default observer(({ onNext, onBack }) => {
  const {
    watermarkStore: {
      imgUris,
      title,
      code,
      logo,
      xPercent,
      yPercent,
      fontSize,
      updateData,
    },
  } = useStores()
  const imgUri = imgUris[0]

  const [imageRatio, setImageRatio] = useState(0)
  const [imageWrapperHeight, setImageWrapperHeight] = useState(0)

  const getImageResolution = async () => {
    const { width, height } = await getResolutionAsync(imgUri)
    setImageRatio(width / height)
  }

  useEffect(() => {
    getImageResolution()
  }, [])

  const handleImageOnLayout = event => {
    setImageWrapperHeight(event.nativeEvent.layout.height)
  }

  const imageStyle = {
    aspectRatio: imageRatio,
  }
  let logoPos
  let codePos
  if (Metrics.screenWidth > imageWrapperHeight * imageRatio) {
    const w = imageWrapperHeight * imageRatio
    const h = imageWrapperHeight
    imageStyle.flex = 1
    logoPos = {
      left: w * xPercent,
      top: h * yPercent,
    }
    codePos = {
      right: w * CODE_X_PERCENT,
      bottom: h * CODE_Y_PERCENT,
    }
  } else {
    const w = Metrics.screenWidth
    const h = imageRatio === 0 ? 0 : Metrics.screenWidth / imageRatio
    imageStyle.width = Metrics.screenWidth
    logoPos = {
      left: w * xPercent,
      top: h * yPercent,
    }
    codePos = {
      right: w * CODE_X_PERCENT,
      bottom: h * CODE_Y_PERCENT,
    }
  }
  const logoStyle = { width: 5.3 * fontSize, height: 2 * fontSize }

  return (
    <Layout>
      <Header
        title={i.get('adjust_position')}
        onNext={onNext}
        onBack={onBack}
      />
      <Slider
        text={i.get('x_value')}
        value={xPercent}
        onValueChange={value => updateData({ xPercent: value })}
      />
      <Slider
        text={i.get('y_value')}
        value={yPercent}
        onValueChange={value => updateData({ yPercent: value })}
      />
      <Slider
        text={i.get('font_size')}
        value={fontSize}
        onValueChange={value => updateData({ fontSize: value })}
        minimumValue={10}
        maximumValue={50}
      />
      <View style={styles.imgWrapper} onLayout={handleImageOnLayout}>
        <View style={styles.imgContent}>
          <FastImage style={imageStyle} source={{ uri: imgUri }}>
            <Text style={[styles.code, codePos, { fontSize }]}>{code}</Text>
            <View style={[styles.logoWrapper, logoPos]}>
              <FastImage source={{ uri: logo }} style={logoStyle} />
              <Text style={[styles.logoTitle, { fontSize }]}>{title}</Text>
            </View>
          </FastImage>
        </View>
      </View>
    </Layout>
  )
})
