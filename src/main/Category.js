// @flow

import * as React from 'react';

import { Card, Feed } from '../components';
import FoodAPI from './api';

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
      uri: career.picture.image.url
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

  render(): React.Node {
    const { renderItem } = this;
    const { navigation } = this.props;
    const { careers } = navigation.state.params;
    const data = careers;
    const title = 'Carreras';
    return <Feed {...{ data, renderItem, title, navigation }} />;
  }
}
