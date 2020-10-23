import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CheckBox, Input} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

import {Header} from '../../components';
import {toFullLocalPath} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ({navigation}) => {
  const [mode, setMode] = useState('mark');
  const [price, setPrice] = useState('180');

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
      console.log(e.message);
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
      <CheckBox
        title="Mark number"
        checked={mode === 'mark'}
        onPress={() => setMode('mark')}
      />
      <CheckBox
        title="Mark price"
        checked={mode === 'price'}
        onPress={() => setMode('price')}
      />
      {mode === 'price' && (
        <Input
          value={price}
          onChangeText={setPrice}
          placeholder="price"
          leftIcon={{type: 'ionicon', name: 'ios-pricetag'}}
          leftIconContainerStyle={{marginRight: 10}}
        />
      )}
    </View>
  );
};
