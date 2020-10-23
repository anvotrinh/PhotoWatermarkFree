import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ImageOption from './screens/image-option';
import ImageMarkPreview from './screens/image-mark-preview';
import ImageMarkEdit from './screens/image-mark-edit';
import ImagePricePreview from './screens/image-price-preview';
import ImagePriceEdit from './screens/image-price-edit';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ImageOption" component={ImageOption} />
      <Stack.Screen name="ImageMarkPreview" component={ImageMarkPreview} />
      <Stack.Screen name="ImageMarkEdit" component={ImageMarkEdit} />
      <Stack.Screen name="ImagePricePreview" component={ImagePricePreview} />
      <Stack.Screen name="ImagePriceEdit" component={ImagePriceEdit} />
    </Stack.Navigator>
  </NavigationContainer>
);
