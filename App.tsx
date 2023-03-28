import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
