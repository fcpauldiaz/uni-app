// @flow

import * as React from 'react';

import { Card, Feed } from '../components';

import type { Career } from '../components/detail/Model';
import type { NavigationProps } from '../components';

export default class CategoryComp extends React.Component<
  NavigationProps<{ categoryId: string }>
> {
  renderItem = (career: Career): React.Node => {
    const { navigation } = this.props;
    const description = `${career.years} ${
      career.years > 1 ? 'años' : 'año'
    } · ${career.credits} créditos`;
    const picture = {
      uri: career.picture[0] ? career.picture[0].url : undefined,
    };
    return (
      <Card
        height={250}
        onPress={() =>
          navigation.navigate('Career', { career })
        }
        {...{ description }}
        {...career}
        picture={picture}
      />
    );
  };

  onPress = () => {
    const { navigation } = this.props;
    const { careers } = navigation.state.params;
    navigation.navigate('Careers', { data: careers });
  };

  render(): React.Node {
    const { renderItem, onPress} = this;
    const { navigation } = this.props;
    const { careers } = navigation.state.params;
    const data = careers;
    const title = 'Carreras';
    const rightAction = {
      icon: 'arrow-left',
      onPress
    };
    return <Feed {...{ data, renderItem, title, navigation, rightAction }} />;
  }
}
