// @flow
import {Asset} from 'expo-asset';
import logo from '../../../assets/logo.png';
import auditoria from '../../../assets/auditoria.jpg';

export default class Images {
  static logo = logo;
  static auditoria = auditoria;

  static downloadAsync(): Promise<*>[] {
    return [Asset.loadAsync(Images.logo), Asset.loadAsync(Images.auditoria)];
  }
}
