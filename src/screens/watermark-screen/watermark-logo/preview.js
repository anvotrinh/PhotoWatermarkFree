import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { getResolutionAsync } from '../../../utils/image'
import { Slider, Header, Layout, Text } from '../../../components'
import { Colors, Metrics } from '../../../theme'
import { useStores } from '../../../models/root-store'

const styles = StyleSheet.create({
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
  if (Metrics.screenWidth > imageWrapperHeight * imageRatio) {
    imageStyle.flex = 1
    logoPos = {
      left: imageWrapperHeight * imageRatio * xPercent,
      top: imageWrapperHeight * yPercent,
    }
  } else {
    imageStyle.width = Metrics.screenWidth
    logoPos = {
      left: Metrics.screenWidth * xPercent,
      top: imageRatio === 0 ? 0 : (Metrics.screenWidth / imageRatio) * yPercent,
    }
  }
  const logoStyle = { width: 5.3 * fontSize, height: 2 * fontSize }

  return (
    <Layout>
      <Header title='Adjust Position' onNext={onNext} onBack={onBack} />
      <Slider
        text='X Value'
        value={xPercent}
        onValueChange={value => updateData({ xPercent: value })}
      />
      <Slider
        text='Y Value'
        value={yPercent}
        onValueChange={value => updateData({ yPercent: value })}
      />
      <Slider
        text='Font size'
        value={fontSize}
        onValueChange={value => updateData({ fontSize: value })}
        minimumValue={10}
        maximumValue={50}
      />
      <View style={styles.imgWrapper} onLayout={handleImageOnLayout}>
        <View style={styles.imgContent}>
          <FastImage style={imageStyle} source={{ uri: imgUri }} />
          <View style={[styles.logoWrapper, logoPos]}>
            <FastImage source={{ uri: logo }} style={logoStyle} />
            <Text style={[styles.logoTitle, { fontSize }]}>{title}</Text>
          </View>
        </View>
      </View>
    </Layout>
  )
})
