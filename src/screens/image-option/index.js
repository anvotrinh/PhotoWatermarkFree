import React, {useState} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {CheckBox, Input, Overlay, Text, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import {Header} from '../../components';
import {toFullLocalPath} from '../../utils';

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
});

export default ({navigation}) => {
  const [mode, setMode] = useState('mark');
  const [price, setPrice] = useState('Your text');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState('');

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
        navigation.navigate('ImagePricePreview', {imgUris, price});
      }
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
        <Input
          value={price}
          onChangeText={setPrice}
          placeholder="Your text"
          leftIcon={{type: 'ionicon', name: 'ios-pricetag'}}
          leftIconContainerStyle={{marginRight: 10}}
        />
      )}
    </View>
  );
};
