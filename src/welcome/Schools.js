import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { ThemeProvider, Colors, StyleGuide } from '../components';

import Kit from './Kit';

export const Schools = ({ schools, navigation }) => {
  const navigate = (themeName: ThemeName, careers) => {
    const themeProvider = ThemeProvider.getInstance();
    themeProvider.switchColors(Colors[themeName]);
    navigation.navigate('Careers', { data: careers });
  };

  if (schools.length === 0) {
    return (
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../assets/loader.json')}
        animationStyle={styles.loader}
        speed={1}
      />
    );
  }

  return schools.map(school => (
    <Kit
      key={school.id}
      uri={school.picture[0] ? school.picture[0].url: undefined}
      title={school.title}
      careers={school.careers}
      backgroundColor={Colors.Career.primary}
      onPress={() => navigate('Career', school.careers)}
    />
  ));
};

const styles = StyleSheet.create({
  loader: {
    width: 200,
    height: 200
  }
});
