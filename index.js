/** @format */

import { AppRegistry } from 'react-native';
import App from './navigation';
import { name as appName } from './app.json';
import axios from 'axios';


axios.defaults.baseURL = 'http://cloud-music-api.cyhbulai.top/';
axios.defaults.withCredentials = true


AppRegistry.registerComponent(appName, () => App);
