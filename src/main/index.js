// @flow
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  StackNavigatorOptions,
  TabNavigatorOptions
} from '../components/Navigation';

import Careers from './Careers';
import Category from './Category';
import Career from './Career';
import Locations from './Locations';
import Location from './Location';

const tabs = [
  { key: 'Careers', label: 'Careers', icon: 'feed' },
  { key: 'Locations', label: 'Locations', icon: 'map' }
];

const CareersNavigator = createStackNavigator(
  {
    Careers: { screen: Careers },
    Category: { screen: Category },
    Career: { screen: Career }
  },
  StackNavigatorOptions
);

const LocationNavigator = createStackNavigator(
  {
    Locations: { screen: Locations },
    Location: { screen: Location }
  },
  StackNavigatorOptions
);

export const CareerNavigator = createBottomTabNavigator(
  {
    Careers: { screen: CareersNavigator },
    Locations: { screen: LocationNavigator }
  },
  TabNavigatorOptions(tabs)
);
