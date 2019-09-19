// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {type ____ViewStyleProp_Internal as ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
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
    if (top) {
      return <View style={[styles.container, style]}>{children}</View>;
    }
    return <View {...{style}}>{children}</View>;
  }
}
