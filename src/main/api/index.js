// @flow
import type { School } from '../../components/detail/Model';

const data = require('./recipes');
const locations = require('./restaurants');

const api: School = {
  categories: data.categories,
  careers: data.careers,
  locations
};

export default api;
