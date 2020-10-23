import React from 'react';
import {StyleSheet} from 'react-native';
import {Header as EHeader} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
});

const iconDefaultProps = {
  color: 'white',
  size: 40,
};

export const Header = ({navigation, title, hasBack = true, onNext}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const backBtn = hasBack
    ? {
        icon: 'ios-arrow-back',
        type: 'ionicon',
        onPress: handleBack,
        iconStyle: {paddingHorizontal: 20},
        ...iconDefaultProps,
      }
    : null;

  const nextBtn = onNext
    ? {
        icon: 'ios-arrow-forward',
        type: 'ionicon',
        onPress: onNext,
        iconStyle: {paddingHorizontal: 20},
        ...iconDefaultProps,
      }
    : null;

  return (
    <EHeader
      leftComponent={backBtn}
      centerComponent={{text: title, style: styles.title}}
      rightComponent={nextBtn}
    />
  );
};
