// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, Image, StyleGuide } from '../../components';

import type { Location } from '../../components/food/Model';

export default class Address extends React.PureComponent<{
  location: Location
}> {
  render(): React.Node {
    const { location } = this.props;
    const { picture, title, address, city, country } = location;
    return (
      <View style={styles.container}>
        <View>
          <Text type="headline">{title}</Text>
          <Text type="footnote">{address}</Text>
          <Text type="footnote">{`${city}, ${country}`}</Text>
        </View>
        <Image style={styles.picture} {...picture} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: StyleGuide.spacing.small,
    ...StyleGuide.styles.separator
  },
  picture: {
    width: 100,
    height: 68,
    marginLeft: StyleGuide.spacing.small,
    ...StyleGuide.styles.borderRadius
  }
});
