// @flow
import * as React from 'react';

import { Card, Feed } from '../components';

import FoodAPI from './api';
import type { Category } from '../components/detail/Model';

import type { NavigationProps } from '../components';

export default class Careers extends React.Component<NavigationProps<>> {
  renderItem = (category: Category): React.Node => {
    const { navigation } = this.props;
    return (
      <Card
        {...category}
        onPress={() =>
          navigation.navigate('Category', { categoryId: category.id })
        }
      />
    );
  };

  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Welcome');
  };

  groupBy = (items, keyGetterFunction) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [keyGetterFunction(item)]: [
          ...(result[keyGetterFunction(item)] || []),
          item
        ]
      }),
      {}
    );

  render(): React.Node {
    const { renderItem, onPress, groupBy } = this;
    const { navigation } = this.props;
    console.log(navigation.getParam('data'));
    const careers = navigation.getParam('data');
    const groupedCareers = groupBy(careers, career => career.category.type);
    console.log(groupedCareers);
    const data = FoodAPI.categories;
    const title = 'Carreras';
    const rightAction = {
      icon: 'arrow-left',
      onPress
    };
    return <Feed {...{ data, renderItem, title, navigation, rightAction }} />;
  }
}
