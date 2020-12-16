import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, Dimensions } from 'react-native'
import Slider from '@react-native-community/slider'

import { getResolutionAsync } from '../../utils'
import { Header } from '../../components'

const imageWrapperWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  imgWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  imgContent: {
    flex: 1,
  },
  sampleTextWrapper: {
    position: 'absolute',
    padding: 3,
    backgroundColor: '#E16A88',
    borderRadius: 5,
  },
  sampleText: {
    fontSize: 37,
    fontFamily: 'Arial',
    color: 'white',
  },
})

const SliderWithText = ({ text, ...otherProps }) => (
  <View style={styles.sliderWithText}>
    <Text>{`${text}: `}</Text>
    <Slider
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor='#E16A88'
      maximumTrackTintColor='#000000'
      style={styles.slider}
      {...otherProps}
    />
  </View>
)

export default ({ navigation, route }) => {
  const { imgUris, prefix } = route.params
  if (imgUris.length === 0) {
    return null
  }
  const imgUri = imgUris[0]
  const sampleText = `${prefix} 1`

  const [imageRatio, setImageRatio] = useState(0)
  const [xPercent, setXPercent] = useState(0.6)
  const [yPercent, setYPercent] = useState(0.36)
  const [fontSize, setFontSize] = useState(37)
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

  const handleNext = () => {
    navigation.navigate('ImageMarkEdit', {
      imgUris,
      xPercent,
      yPercent,
      fontSize,
      prefix,
    })
  }

  const imageStyle = {
    aspectRatio: imageRatio,
  }
  let sampleTextPos
  if (imageWrapperWidth > imageWrapperHeight * imageRatio) {
    imageStyle.flex = 1
    sampleTextPos = {
      left: imageWrapperHeight * imageRatio * xPercent,
      top: imageWrapperHeight * yPercent,
    }
  } else {
    imageStyle.width = imageWrapperWidth
    sampleTextPos = {
      left: imageWrapperWidth * xPercent,
      top: imageRatio === 0 ? 0 : (imageWrapperWidth / imageRatio) * yPercent,
    }
  }

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title='Adjust Position'
        onNext={handleNext}
      />
      <SliderWithText
        text='X Value'
        value={xPercent}
        onValueChange={setXPercent}
      />
      <SliderWithText
        text='Y Value'
        value={yPercent}
        onValueChange={setYPercent}
      />
      <SliderWithText
        text='Font size'
        value={fontSize}
        onValueChange={setFontSize}
        minimumValue={10}
        maximumValue={50}
      />
      <View style={styles.imgWrapper} onLayout={handleImageOnLayout}>
        <View style={styles.imgContent}>
          <Image style={imageStyle} source={{ uri: imgUri }} />
          <View style={[styles.sampleTextWrapper, sampleTextPos]}>
            <Text style={[styles.sampleText, { fontSize }]}>{sampleText}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
