/**
 * Heritage Times - Donation App
 * Donation Flow Application
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import Colors from './src/config/colors';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
