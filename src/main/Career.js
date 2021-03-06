// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Container,
  Header,
  NavigationBar,
  DetailsBar,
  Content,
  List,
  Button,
  ActionSheet,
  StyleGuide,
  notImplementedYet
} from '../components';
import { Linking, TextInput, Share } from 'react-native';

import { Info, Step } from '../components/detail';
import Visit from './Visit';

import type { NavigationProps } from '../components/';


export default class Career extends React.Component<
  NavigationProps<{ categoryId: string, recipeId: string }>
> {
  // TODO: use createRef()
  additionalInfoList: ActionSheet;

  render(): React.Node {
    const { navigation } = this.props;
    const { career } = navigation.state.params;
    const category = career.category;
    const years = `${career.years} ${career.years > 1 ? 'años' : 'año'}`;
    const credits = `${career.credits} créditos`;
    const picture = {
      uri: career.picture[0] ? career.picture[0].url : undefined,
    };
    return (
      <Container>
        <Header title={career.title} picture={picture} heightRatio={0.5}>
          <NavigationBar
            type="transparent"
            back={category.title}
            {...{ navigation }}
          />
        </Header>
        <DetailsBar
          details={[
            { icon: 'time', caption: years },
            { icon: 'account', caption: credits }
          ]}
        />
        <Content style={styles.gutter}>
          <Button
            primary
            label="Más información"
            onPress={this.toggleAdditionalInfoList}
          />
          <View style={styles.list}>
            {career.list_details.map((visit, index) => (
              <Visit
                style={styles.separator}
                key={index}
                first={index === 0}
                last={index === career.list_details.length - 1}
                {...{ visit }}
              />
            ))}
          </View>
          <Button
            primary
            label="Solicitar Admisión"
            onPress={() => Linking.openURL(career.admission_link)}
          />
        </Content>
        <ActionSheet
          title="Información Adicional"
          ref={this.setAdditionalInfoRef}
          scrollable
        >
          {career.additional_info.map((info, key) => (
            <Info {...{ info, key }} />
          ))}
          <View style={styles.gutter}>
            <Button
              primary
              label="Solicitar más información en Facebook"
              onPress={() => Linking.openURL(career.fb_page)}
            />
            <Button
              whatsapp
              visible={career.whatsapp !== ''}
              label="Solicitar más información en Whatsapp"
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=¿Me podrian mandar mas informacion sobre ${career.title}?&phone=${career.whatsapp}`
                )
              }
            />
          </View>
        </ActionSheet>
      </Container>
    );
  }

  toggleAdditionalInfoList = () => {
    this.additionalInfoList.toggle();
  };

  setAdditionalInfoRef = (additionalInfoList: ?ActionSheet) => {
    if (additionalInfoList) {
      this.additionalInfoList = additionalInfoList;
    }
  };
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
