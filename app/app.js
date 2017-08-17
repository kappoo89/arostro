import React from 'react';
import Expo from 'expo';

import HomeScreen from './screens/homeScreen';
import DetailScreen from './screens/detailScreen';

import {createRouter, NavigationProvider, StackNavigation} from '@expo/ex-navigation';

import {Font} from 'expo';

const Router = createRouter(() => ({
  home: () => HomeScreen,
  detail: () => DetailScreen
}));

class App extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({'FontName': require('../assets/fonts/icomoon.ttf')});
    this.setState({fontLoaded: true});
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')}/>
      </NavigationProvider>
    );
  }
}

Expo.registerRootComponent(App);
