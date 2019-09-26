// @flow

import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Container,
  Header,
  NavigationBar,
  DetailsBar,
  Content,
  Text,
  BaseCard,
  Button,
  ActionSheet,
  StyleGuide,
  Map,
  Ratings
} from '../components';

import { Adress } from '../components/detail';
import { showLocation } from 'react-native-map-link';
import type { NavigationProps } from '../components';
import type { Location } from '../components/detail/Model';

export default class RestaurantComp extends React.Component<
  NavigationProps<{ restaurant: Location }>
> {
  // TODO: use createRef()
  reservation: ActionSheet;

  render(): React.Node {
    const { navigation } = this.props;
    const { restaurant } = navigation.state.params;
    const { ratings, title, picture, coordinate, description } = restaurant;
    const details = [
      {
        comp: <Ratings {...{ ratings }} />,
        caption: `${restaurant.reviews} reviews`
      },
      {
        icon: 'time',
        caption: `${restaurant.openings.from} - ${restaurant.openings.to}`
      }
    ];
    return (
      <Container>
        <Header {...{ title, picture }}>
          <NavigationBar type="transparent" back="Sedes" {...{ navigation }} />
        </Header>
        <DetailsBar {...{ details }} />
        <Content>
          <Map
            height={250}
            markers={[restaurant]}
            coordinate={
              coordinate || { latitude: 14.62419, longitude: -90.515359 }
            }
            {...{ coordinate }}
          />
          <View style={styles.description}>
            <Button
              primary
              label="Abrir Ubicación"
              onPress={this.makeReservation}
              style={styles.makeReservation}
            />
            <BaseCard>
              <Text>{description}</Text>
            </BaseCard>
          </View>
        </Content>
        <ActionSheet title="Ubicación" ref={this.setReservationRef} scrollable>
          <Adress {...{ restaurant }} />
          <View style={styles.gutter}>
            <Button primary label="Abrir" onPress={this.openMaps} />
          </View>
        </ActionSheet>
      </Container>
    );
  }

  makeReservation = () => {
    this.reservation.toggle();
  };

  openMaps = () => {
    showLocation({ latitude: 14.62419, longitude: -90.515359 });
  };

  setReservationRef = (reservation: ?ActionSheet) => {
    if (reservation) {
      this.reservation = reservation;
    }
  };
}

const styles = StyleSheet.create({
  gutter: {
    padding: StyleGuide.spacing.small
  },
  makeReservation: {
    marginHorizontal: StyleGuide.spacing.small
  },
  description: {
    position: 'relative',
    top: -100
  }
});
