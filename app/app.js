import React from 'react';
import Expo from 'expo';

import HomeScreen from './screens/homeScreen';
import AboutScreen from './screens/aboutScreen';

import {createRouter, NavigationProvider, StackNavigation} from '@expo/ex-navigation';

const Router = createRouter(() => ({
  home: () => HomeScreen,
  detail: () => DetailScreen
}));

class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')}/>
      </NavigationProvider>
    );
  }
}

Expo.registerRootComponent(App);
