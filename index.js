/** @format */

import { AppRegistry } from 'react-native';
import App from './navigation';
import { name as appName } from './app.json';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true


AppRegistry.registerComponent(appName, () => App);
