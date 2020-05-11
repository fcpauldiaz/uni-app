import React, { Fragment } from 'react';
import NotificationList from './NotificationList';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Container,
  Header,
  NavigationBar,
  Button,
  Colors
} from '../components';

_renderItem = ({ item }) => (
  <View key={item.title}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.body}>{item.body}</Text>
  </View>
);

const PushContainer = ({ navigation }) => {
  let notification = undefined;
  try {
    notification = navigation.getParam('notification');
  } catch (error) {
    navigation.navigate('Welcome');
  }
  return (
    <Container>
      <Header title="Noticias" heightRatio={0.5}>
        <NavigationBar type="transparent" />
      </Header>
      <View style={styles.listHeader}>
        <Text>Notificaciones</Text>
      </View>
      <View style={styles.body}>
        <NotificationList
          renderItem={_renderItem}
          notification={notification}
        />
        <Button
          primary
          label="Regresar"
          onPress={() => navigation.navigate('Welcome')}
        ></Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: Colors.Career.primary },
  listHeader: {
    backgroundColor: '#eee',
    color: '#222',
    height: 44,
    padding: 12
  },
  title: { fontSize: 18, fontWeight: 'bold', paddingTop: 10 },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  engine: { position: 'absolute', right: 0 },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 24, fontWeight: '600' },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: { fontWeight: '700' },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
});

export default PushContainer;
