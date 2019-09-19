// @flow
import * as React from "react";

import {Card, Feed} from "../components";

import FoodAPI from "./api";
import type {Category} from "../components/food/Model";

import type {NavigationProps} from "../components";

export default class Careers extends React.Component<NavigationProps<>> {

    renderItem = (category: Category): React.Node => {
        const {navigation} = this.props;
        return <Card {...category} onPress={() => navigation.navigate("Category", { categoryId: category.id })} />;
    }

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = FoodAPI.categories;
        const title = "Carreras";
        const rightAction = {
            icon: "arrow-left",
            onPress
        };
        return (
            <Feed {...{data, renderItem, title, navigation, rightAction}} />
        );
    }
}
