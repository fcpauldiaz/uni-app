// @flow
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';

import { Text, StyleGuide, Icon } from '../../components';

import type { Info } from '../../components/detail/Model';

type InfoProps = {
  info: Info
};

export default class InfoComponent extends React.Component<InfoProps> {
  constructor(props: InfoProps) {
    super(props);
    const { link } = props.info;
    this.state = {
      link
    };
  }

  toggle = () => {
    const { info } = this.props;
    Linking.openURL(info.link);
  };

  render(): React.Node {
    const { info } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.toggle}>
          <View style={[styles.content]}>
            <View style={styles.radio}>
              <Icon name={'circle'} primary />
            </View>
            <View style={styles.text}>
              <Text>{info.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    ...StyleGuide.styles.separator
  },
  content: {
    flexDirection: 'row',
    height: 50
  },
  subhead: {
    color: StyleGuide.palette.darkGray
  },
  radio: {
    paddingHorizontal: StyleGuide.spacing.small,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: StyleGuide.spacing.tiny
  },
  semiOpaque: {
    opacity: 0.5
  },
  opaque: {
    opacity: 1
  }
});
