/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { ProductsApp } from './src/presentation/store/ProductsApp';

AppRegistry.registerComponent(appName, () => ProductsApp);
