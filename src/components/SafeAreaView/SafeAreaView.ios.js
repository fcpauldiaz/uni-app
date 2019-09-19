// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {type ____ViewStyleProp_Internal as ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
});

type SafeAreaViewProps = {
  top: boolean,
  children: React.Node,
  style: ViewStyle,
};

export default class extends React.PureComponent<SafeAreaViewProps> {
  static defaultProps = {
    top: false,
    style: undefined,
  };

  render(): React.Node {
    const {top, style, children} = this.props;
    // https://github.com/facebook/react-native/issues/17638#issuecomment-370512300
    const majorIOSVersion = parseInt(Platform.Version, 10);
    if (top && majorIOSVersion < 11) {
      return <View style={[styles.container, style]}>{children}</View>;
    }
    return <SafeAreaView {...{style}}>{children}</SafeAreaView>;
  }
}
