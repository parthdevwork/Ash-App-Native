import React from 'react';
import {I18nManager} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './src/Navigation';
import {Store} from './src/Store/Store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import './src/i18next';

const App = () => {
  I18nManager.forceRTL(false);
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
