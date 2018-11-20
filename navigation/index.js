import React from "react";
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import AppScreen from '../App';
import LoadingScreen from '../src/pages/Loading';
import LoginScreen from '../src/pages/Login';

const AppNavigator = createStackNavigator({
  Loading: {
    screen: LoadingScreen,
    navigationOptions: {
      header: null
    }
  },
  Index: {
    screen: AppScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
});

const APP = createAppContainer(AppNavigator);

export default APP;