// @flow
import * as React from "react";
import {ScrollView, StyleSheet, View, Image, StatusBar} from "react-native";
import { Dimensions } from 'react-native';
import {ThemeProvider, Colors, StyleGuide, Images, Text, SafeAreaView} from "../components";

import Kit from "./Kit";

import type {ThemeName} from "../components/theme";
import type {NavigationProps} from "../components/Navigation";

const images = require("./images");
const window = Dimensions.get('window');
export default class Welcome extends React.Component<NavigationProps<>> {

    navigate(themeName: ThemeName) {
        const { navigation } = this.props;
        const themeProvider = ThemeProvider.getInstance();
        themeProvider.switchColors(Colors[themeName]);
        navigation.navigate(themeName);
    }

    careers = () => this.navigate("Career");

    render(): React.Node {
        return (
            <React.Fragment>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeHeader} top>
                        <View style={styles.header}>
                            <View>
                                <Text type="footnote">Mundo UNI</Text>
                                <Text type="title1">Universidad InterNaciones</Text>
                            </View>
                            <Image source={Images.logo} style={styles.logo} />
                        </View>
                    </SafeAreaView>
                    <ScrollView contentContainerStyle={styles.content}>
                        <SafeAreaView>
                            <Kit
                                uri={images.auditoria.uri}
                                preview={images.auditoria.preview}
                                title="Escuela de Auditoría"
                                backgroundColor={Colors.Career.primary}
                                onPress={this.careers}
                            />
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeHeader: {
        ...StyleGuide.styles.shadow
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.small,
        width: window.width - 60
    },
    logo: {
        width: 50,
        height: 50
    },
    content: {
        paddingVertical: StyleGuide.spacing.small
    }
});
