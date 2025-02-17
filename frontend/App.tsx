import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';
import 'react-native-polyfill-globals/auto';


const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
