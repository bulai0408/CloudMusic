/** @format */
import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import App from './navigation';
import { name as appName } from './app.json';
import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './src/redux/reducer';
import rootSaga from './src/redux/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

axios.defaults.baseURL = 'http://cloud-music-api.cyhbulai.top/';
// axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true

AppRegistry.registerComponent(appName, () => Root);
