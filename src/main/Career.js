// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar, DetailsBar, Content, List, Button, ActionSheet, StyleGuide, notImplementedYet
} from "../components";

import FoodAPI from "./api";
import {Ingredient, Step} from "../components/food";
import Visit from "./Visit";

import type {NavigationProps} from "../components/";

export default class Career extends React.Component<NavigationProps<{ categoryId: string, recipeId: string }>> {

    // TODO: use createRef()
    ingredientList: ActionSheet;

    render(): React.Node {
        const {navigation} = this.props;
        const {categoryId, recipeId} = navigation.state.params;
        const category = FoodAPI.categories.filter(cat => categoryId === cat.id)[0];
        const career = FoodAPI.careers[category.id].filter(r => r.id === recipeId)[0];
        console.log(career);
        const years = `${career.years} ${career.years > 1 ? "años" : "año"}`;
        const credits = `${career.credits} créditos`;
        return (
            <Container>
                <Header title={career.title} picture={career.picture} heightRatio={0.5}>
                    <NavigationBar type="transparent" back={category.title} {...{navigation}} />
                </Header>
                <DetailsBar details={[{ icon: "time", caption: years }, { icon: "account", caption: credits }]} />
                <Content style={styles.gutter}>
                    <Button primary label="Más información" onPress={this.toggleIngredientList} />
                    <View style={styles.list}>
                        {
                            career.instructions.map((visit, index) => (
                                <Visit
                                    style={styles.separator}
                                    key={index}
                                    first={index === 0}
                                    last={index === (career.instructions.length - 1)}
                                    {...{ visit }}
                                />
                            ))
                        }
                    </View>
                </Content>
                <ActionSheet title="Ingredients" ref={this.setIngredientListRef} scrollable>
                    {
                        career.ingredients.map((ingredient, key) => <Ingredient {...{ingredient, key}} />)
                    }
                    <View style={styles.gutter}>
                        <Button primary label="Add to Reminder" onPress={notImplementedYet} />
                    </View>
                </ActionSheet>
            </Container>
        );
    }

    toggleIngredientList = () => {
        this.ingredientList.toggle();
    }

    setIngredientListRef = (ingredientList: ?ActionSheet) => {
        if (ingredientList) {
            this.ingredientList = ingredientList;
        }
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small
    },
    list: {
        backgroundColor: StyleGuide.palette.white,
        ...StyleGuide.styles.borderRadius
    },
    separator: {
        ...StyleGuide.styles.separator
    }
});
