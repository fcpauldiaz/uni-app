// @flow
import React, { useEffect, useState, useContext } from 'react';

import { Card, Feed } from '../components';

import type { Category } from '../components/detail/Model';

import type { NavigationProps } from '../components';
import { StateContext } from '../components/Context';

function Careers(props) {
  const [data, setData] = useState([]);
  const [groupedCareers, setGroupedData] = useState({});
  const globalState = useContext(StateContext);

  const renderItem = (category: Category): React.Node => {
    const { navigation } = props;
    const picture = {
      uri: category.picture[0] ? category.picture[0].url : undefined,
    };
    return (
      <Card
        {...category}
        picture={picture}
        onPress={() =>
          navigation.navigate('Category', {
            careers: groupedCareers[category.type],
          })
        }
      />
    );
  };

  const onPress = () => {
    const { navigation } = props;
    navigation.navigate('Welcome');
  };

  const groupBy = (items, keyGetterFunction) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [keyGetterFunction(item)]: [
          ...(result[keyGetterFunction(item)] || []),
          item,
        ],
      }),
      {}
    );

  const getCategoriesData = (categories, allData) => {
    const processed = [];
    const result = [];
    for (let category of categories) {
      if (allData[category.type]) {
        for (let career of allData[category.type]) {
          if (career.type == category.type && !result.includes(category.type)) {
            result.push(category);
            break;
          }
        }
      }
    }
    return result;
  };
  // componentDidMount
  useEffect(() => {
    const { navigation } = props;
    const careers = navigation.getParam('data');
    const [contextData] = globalState;
    const categories = contextData.categories;
    const groupedCareers = groupBy(careers, (career) => career.type);
    const data = getCategoriesData(categories, groupedCareers);
    setData(data);
    setGroupedData(groupedCareers);
  }, []);

  const { navigation } = props;
  const title = 'Grado Académico';
  const rightAction = {
    icon: 'arrow-left',
    onPress,
  };
  return <Feed {...{ data, renderItem, title, navigation, rightAction }} />;
}

export default Careers;
