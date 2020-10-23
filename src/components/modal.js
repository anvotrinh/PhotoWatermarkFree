import React from 'react';
import {
  StyleSheet,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export const Modal = ({visible, children}) => {
  return (
    <RNModal transparent visible={visible} hardwareAccelerated>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.content}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
