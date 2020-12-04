import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Linking, Image, AsyncStorage} from 'react-native';
import {CheckBox, Input, Overlay, Text, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';

import {Header} from '../../components';
import {toFullLocalPath} from '../../utils';
import logoBase64 from '../../base64/logo.js';

function isMissingPermissionMessage(message) {
  return (
    message.startsWith('Cannot access images') ||
    message.startsWith('Required permission missing')
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    padding: 20,
  },
  overlayBtn: {
    marginTop: 20,
  },
  logoTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  logoTitle: {
    fontSize: 18,
    marginLeft: 13,
  },
  logo: {
    resizeMode: 'stretch',
    width: '50%',
    aspectRatio: 2.65,
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  btnUploadLogo: {
    width: '50%',
    marginLeft: 10,
  },
});

export default ({navigation}) => {
  const [mode, setMode] = useState('mark');
  const [price, setPrice] = useState('Your text');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [logo, setLogo] = useState('');

  const getLocalData = async () => {
    const storedLogo = await AsyncStorage.getItem('logo');
    const storedPrice = await AsyncStorage.getItem('price');
    if (storedLogo) {
      setLogo(storedLogo);
    } else {
      setLogo(logoBase64);
    }
    if (storedPrice) {
      setPrice(storedPrice);
    }
  };

  useEffect(() => {
    getLocalData();
  }, []);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleOpenSetting = () => {
    Linking.openSettings();
  };

  const handleNext = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 100,
      });
      const imgUris = images.map((i) => toFullLocalPath(i.path));
      if (mode === 'mark') {
        navigation.navigate('ImageMarkPreview', {imgUris});
      } else {
        AsyncStorage.setItem('price', price);
        navigation.navigate('ImagePricePreview', {imgUris, price, logo});
      }
    } catch (e) {
      if (e.message === 'User cancelled image selection') {
        return;
      }
      setOverlayVisible(true);
      setMessage(e.message);
    }
  };

  const handleChooseLogo = async () => {
    try {
      const image = await ImagePicker.openPicker({});
      const imgBase64 = await RNFS.readFile(image.path, 'base64');
      setLogo(imgBase64);
      AsyncStorage.setItem('logo', imgBase64);
    } catch (e) {
      if (e.message === 'User cancelled image selection') {
        return;
      }
      setOverlayVisible(true);
      setMessage(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Choose Photo"
        onNext={handleNext}
        hasBack={false}
      />
      <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
        {isMissingPermissionMessage(message) ? (
          <View style={styles.overlayContainer}>
            <Text h4>Need Permission</Text>
            <Text>Please grant Photo permission to use PhotoWatermark.</Text>
            <Button
              icon={<Icon name="ios-settings" size={15} />}
              title="PhotoWatermark Settings"
              onPress={handleOpenSetting}
              style={styles.overlayBtn}
            />
          </View>
        ) : (
          <View style={styles.overlayContainer}>
            <Text>{message}</Text>
          </View>
        )}
      </Overlay>
      <CheckBox
        title="Mark by order number"
        checked={mode === 'mark'}
        onPress={() => setMode('mark')}
      />
      <CheckBox
        title="Mark by text"
        checked={mode === 'price'}
        onPress={() => setMode('price')}
      />
      {mode === 'price' && (
        <>
          <Input
            value={price}
            onChangeText={setPrice}
            placeholder="Your text"
            leftIcon={{type: 'ionicon', name: 'ios-pricetag'}}
            leftIconContainerStyle={{marginRight: 10}}
          />
          <View style={styles.logoTitleWrapper}>
            <Icon name="md-image" size={25} />
            <Text style={styles.logoTitle}>Logo Image (ratio 2.65 : 1):</Text>
          </View>
          {logo && (
            <Image
              source={{uri: `data:image/png;base64,${logo}`}}
              style={styles.logo}
            />
          )}
          <Button
            icon={<IconAntDesign name="upload" size={15} color="white" />}
            title=" Choose Other Logo"
            style={styles.btnUploadLogo}
            onPress={handleChooseLogo}
          />
        </>
      )}
    </View>
  );
};
