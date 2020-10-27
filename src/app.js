import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';

import AppNavigator from './app-navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export default () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
};
