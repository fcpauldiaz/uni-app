// @flow
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import {
  ThemeProvider,
  Colors,
  StyleGuide,
  Images,
  Text,
  SafeAreaView,
  StateContext
} from '../components';

import Kit from './Kit';

import type { ThemeName } from '../components/theme';
import type { NavigationProps } from '../components/Navigation';
import { useStateValue } from '../components/Context';

const images = require('./images');
const window = Dimensions.get('window');

function Welcome(props) {
  const [{ schools }, dispatch] = useStateValue();

  //useEffect to call API
  useEffect(() => {
    fetch(`${API_URL}/schools`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'setState',
          schools: response
        });
      })
      .catch(e => console.log(e));
  }, []);

  const navigate = (themeName: ThemeName, careers) => {
    const { navigation } = props;
    const themeProvider = ThemeProvider.getInstance();
    themeProvider.switchColors(Colors[themeName]);
    navigation.navigate('Careers', { data: careers })
  };


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
              <Text type="footnote">Mundo UNI
              </Text>
              <Text type="title1">Universidad InterNaciones</Text>
            </View>
            <Image source={Images.logo} style={styles.logo} />
          </View>
        </SafeAreaView>
        <ScrollView contentContainerStyle={styles.content}>
          <SafeAreaView>
            <StateContext.Consumer>
              {([{ schools = [] }]) =>
                schools.map(school => (
                  <Kit
                    key={school.id}
                    uri={school.picture.image.url}
                    title={school.title}
                    careers={school.careers}
                    backgroundColor={Colors.Career.primary}
                    onPress={() => navigate('Career', school.careers)}
                  />
                ))
              }
            </StateContext.Consumer>
          </SafeAreaView>
        </ScrollView>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeHeader: {
    ...StyleGuide.styles.shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default Welcome;
