// @flow
import * as React from "react";

import {GeoFeed, Activity} from "../components";
import FoodAPI from "./api";

import type {NavigationProps} from "../components";
import type {Locations} from "../components/food/Model";

export default class LocationsComponent extends React.Component<NavigationProps<>> {

    renderItem = (location: Locations): React.Node => {
        const {navigation} = this.props;
        return <Activity {...location} onPress={() => navigation.navigate('Location', { location })} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const markers = FoodAPI.locations;
        return (
            <GeoFeed title="Sedes" {...{markers, navigation, renderItem}} />
        );
    }
}
