import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';
import {CheckBox, Input, Overlay, Text, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';

import {Header, Modal} from '../../components';
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
  const [markPrefix, setMarkPrefix] = useState('Photo');
  const [logo, setLogo] = useState('');
  const [logoBase64Url, setLogoBase64Url] = useState('');
  const [base64ModalVisible, setBase64ModalVisible] = useState(false);

  const getLocalData = async () => {
    const storedLogo = await AsyncStorage.getItem('logo');
    const storedPrice = await AsyncStorage.getItem('price');
    const storedMarkPrefix = await AsyncStorage.getItem('markPrefix');
    if (storedLogo) {
      setLogo(storedLogo);
    } else {
      setLogo(logoBase64);
    }
    if (storedPrice) {
      setPrice(storedPrice);
    }
    if (storedMarkPrefix) {
      setMarkPrefix(storedMarkPrefix);
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
        AsyncStorage.setItem('markPrefix', markPrefix);
        navigation.navigate('ImageMarkPreview', {imgUris, prefix: markPrefix});
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
      const imgData = await RNFS.readFile(image.path, 'base64');
      const imgBase64 = `data:image/png;base64,${imgData}`;
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

  const handleChooseBase64 = () => {
    setBase64ModalVisible(true);
  };

  const handleLogoBase64Submit = async () => {
    try {
      const res = await fetch(logoBase64Url);
      const json = await res.json();
      setLogo(json.base64);
      AsyncStorage.setItem('logo', json.base64);
      setBase64ModalVisible(false);
    } catch (e) {
      Alert.alert(e.message);
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
      {mode === 'mark' && (
        <Input
          label="Prefix text"
          value={markPrefix}
          onChangeText={setMarkPrefix}
          style={{marginLeft: 10}}
        />
      )}
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
          {logo && <Image source={{uri: logo}} style={styles.logo} />}
          <Button
            icon={<IconAntDesign name="upload" size={15} color="white" />}
            title=" Choose Other Logo"
            style={styles.btnUploadLogo}
            onPress={handleChooseLogo}
            onLongPress={handleChooseBase64}
          />
        </>
      )}
      <Modal
        visible={base64ModalVisible}
        onToggle={() => setBase64ModalVisible(false)}>
        <Input
          value={logoBase64Url}
          onChangeText={setLogoBase64Url}
          placeholder="json URL with format { base64: ... }"
          leftIcon={{type: 'foundation', name: 'web'}}
          leftIconContainerStyle={{marginRight: 10}}
        />
        <Button title="Submit" onPress={handleLogoBase64Submit} />
      </Modal>
    </View>
  );
};
