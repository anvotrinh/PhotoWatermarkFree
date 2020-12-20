import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import FastImage from 'react-native-fast-image'

import { getResolutionAsync } from '../../../utils/image'
import { Colors, Metrics } from '../../../theme'
import { Layout, Header, Slider, Text } from '../../../components'
import { useStores } from '../../../models/root-store'

const styles = StyleSheet.create({
  imgContent: {
    flex: 1,
  },
  imgWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  sampleText: {
    color: Colors.white,
    fontFamily: 'Arial',
    fontSize: 37,
  },
  sampleTextWrapper: {
    backgroundColor: Colors.primary,
    borderRadius: Metrics.space.xs,
    padding: 3,
    position: 'absolute',
  },
})

export default observer(({ onBack, onNext }) => {
  const {
    watermarkStore: {
      imgUris,
      orderPrefix,
      xPercent,
      yPercent,
      fontSize,
      updateData,
    },
  } = useStores()
  const imgUri = imgUris[0]
  const sampleText = `${orderPrefix} 1`

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
  let sampleTextPos
  if (Metrics.screenWidth > imageWrapperHeight * imageRatio) {
    imageStyle.flex = 1
    sampleTextPos = {
      left: imageWrapperHeight * imageRatio * xPercent,
      top: imageWrapperHeight * yPercent,
    }
  } else {
    imageStyle.width = Metrics.screenWidth
    sampleTextPos = {
      left: Metrics.screenWidth * xPercent,
      top: imageRatio === 0 ? 0 : (Metrics.screenWidth / imageRatio) * yPercent,
    }
  }

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
          <View style={[styles.sampleTextWrapper, sampleTextPos]}>
            <Text style={[styles.sampleText, { fontSize }]}>{sampleText}</Text>
          </View>
        </View>
      </View>
    </Layout>
  )
})
