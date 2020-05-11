// @flow
import * as React from 'react';

import { Card, Feed } from '../components';

import type { Category } from '../components/detail/Model';

import type { NavigationProps } from '../components';

export default class Careers extends React.Component<NavigationProps<>> {
  state = {
    data: [],
    groupedCareers: {}
  };

  renderItem = (category: Category): React.Node => {
    const { navigation } = this.props;
    const picture = {
      uri: category.picture.image.url
    };
    return (
      <Card
        {...category}
        picture={picture}
        onPress={() =>
          navigation.navigate('Category', {
            careers: this.state.groupedCareers[category.type]
          })
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

  getCategoriesData = (categories, allData) => {
    const processed = [];
    const result = [];
    for (let category of categories) {
      for (let career of allData[category]) {
        if (career.category.type == category && !result.includes(category)) {
          result.push(career.category);
          break;
        }
      }
    }
    return result;
  };

  componentDidMount() {
    const { navigation } = this.props;
    const careers = navigation.getParam('data');
    const groupedCareers = this.groupBy(
      careers,
      career => career.category.type
    );
    const data = this.getCategoriesData(
      Object.keys(groupedCareers),
      groupedCareers
    );
    this.setState({ data, groupedCareers });
  }

  render(): React.Node {
    const { renderItem, onPress, groupBy, getCategoriesData } = this;
    const { navigation } = this.props;
    const { data } = this.state;
    const title = 'Grado Académico';
    const rightAction = {
      icon: 'arrow-left',
      onPress
    };
    return <Feed {...{ data, renderItem, title, navigation, rightAction }} />;
  }
}
