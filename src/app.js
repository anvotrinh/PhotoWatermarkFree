import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import AppNavigator from './app-navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => (
  <SafeAreaView style={styles.container}>
    <AppNavigator />
  </SafeAreaView>
);
