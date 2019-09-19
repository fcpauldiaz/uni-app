// @flow
import type {Food} from "../../components/food/Model";

const data = require("./recipes");
const locations = require("./restaurants");

const api: Food = {
    categories: data.categories,
    careers: data.careers,
    locations
};

export default api;
