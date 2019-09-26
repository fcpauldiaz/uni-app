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
    const { categoryId } = navigation.state.params;
    const description = `${career.years} ${
      career.years > 1 ? 'años' : 'año'
    } · ${career.credits} créditos`;
    return (
      <Card
        height={250}
        onPress={() =>
          navigation.navigate('Career', { categoryId, recipeId: career.id })
        }
        {...{ description }}
        {...career}
      />
    );
  };

  render(): React.Node {
    const { renderItem } = this;
    const { navigation } = this.props;
    const { categoryId } = navigation.state.params;
    const data = FoodAPI.careers[categoryId];
    const { title } = FoodAPI.categories.filter(
      category => category.id === categoryId
    )[0];
    const back = 'Carreras';
    return <Feed {...{ data, renderItem, title, navigation, back }} />;
  }
}
