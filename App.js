// @flow
import * as React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { reducer } from './src/main/reducers/reducer';
import * as Font from 'expo-font';

import {
  Images,
  loadIcons,
  ThemeProvider,
  StateProvider
} from './src/components';

import { Welcome, PushContainer } from './src/welcome';
import { CareerNavigator } from './src/main';

// $FlowFixMe
const SFProTextBold = require('./assets/fonts/SF-Pro-Text-Bold.otf');
// // $FlowFixMe
const SFProTextSemibold = require('./assets/fonts/SF-Pro-Text-Semibold.otf');
// // $FlowFixMe
const SFProTextRegular = require('./assets/fonts/SF-Pro-Text-Regular.otf');

const onNavigationStateChange = () => undefined;

type AppProps = {};
type AppState = {
  isReady: boolean
};

export default class App extends React.Component<AppProps, AppState> {
  state = {
    isReady: false
  };

  ready() {
    this.setState({ isReady: true });
  }

  async componentDidMount(): Promise<void> {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('white');
    }
    const fonts = Font.loadAsync({
      'SFProText-Bold': SFProTextBold,
      'SFProText-Semibold': SFProTextSemibold,
      'SFProText-Regular': SFProTextRegular
    });
    const images = Images.downloadAsync();
    const icons = loadIcons();
    try {
      await Promise.all([fonts, ...images, icons]);
    } catch (e) {
      // Do nothing
    }
    this.ready();
  }

  render(): React.Node {
    const { isReady } = this.state;
    if (!isReady) {
      return (
        <React.Fragment>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <StateProvider reducer={reducer}>
          <ThemeProvider>
            <AppNavigator {...{ onNavigationStateChange }} />
          </ThemeProvider>
        </StateProvider>
      </React.Fragment>
    );
  }
}

const MainNavigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  Career: { screen: CareerNavigator },
  PushContainer: { screen: PushContainer }
});

const AppNavigator = createAppContainer(MainNavigator);
