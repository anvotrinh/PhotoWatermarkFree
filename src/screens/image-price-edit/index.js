import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import * as Progress from 'react-native-progress';
import {Button} from 'react-native-elements';

import html from './html';
import {generateTempPath} from '../../utils';
import {Header, Modal} from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progress: {
    marginTop: 20,
    alignSelf: 'center',
  },
  webView: {
    display: 'none',
  },
  textSuccess: {
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default ({navigation, route}) => {
  const {imgUris, price, xPercent, yPercent, fontSize, logo} = route.params;

  const webViewRef = useRef();
  const [imgIndex, setImgIndex] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (imgIndex === imgUris.length) {
      setSuccessVisible(true);
    } else {
      editImage();
    }
  }, [imgIndex]);

  const editImage = async () => {
    const imgUri = imgUris[imgIndex];
    const imgText = price; // `${price}k + FS`;
    const imgBase64 = await RNFS.readFile(imgUri, 'base64');
    webViewRef.current.injectJavaScript(
      `(function() {
        editImage('${imgBase64}', '${logo}', '${imgText}', ${xPercent}, ${yPercent}, ${fontSize});
      })();`,
    );
  };

  const handleMessage = async (e) => {
    const imgBase64 = e.nativeEvent.data;
    const imageData = imgBase64.split('data:image/png;base64,')[1];
    const imagePath = generateTempPath(`image_${imgIndex}.png`);
    await RNFS.writeFile(imagePath, imageData, 'base64');
    await CameraRoll.save(imagePath, {type: 'photo'});
    setImgIndex(imgIndex + 1);
  };

  const handleSuccess = () => {
    setSuccessVisible(false);
    navigation.navigate('ImageOption');
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Generate Photo" hasBack={false} />
      <Progress.Circle
        size={150}
        progress={imgIndex / imgUris.length}
        showsText
        animated={false}
        style={styles.progress}
      />
      <WebView
        ref={webViewRef}
        source={{html}}
        onMessage={handleMessage}
        onLoad={editImage}
        containerStyle={styles.webView}
      />
      <Modal visible={successVisible}>
        <Text style={styles.textSuccess}>
          Done, please check watermarked photo in Album
        </Text>
        <Button title="OK" onPress={handleSuccess} />
      </Modal>
    </View>
  );
};
