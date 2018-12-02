import React from "react";
import { View, Text, TextInput } from 'react-native';
import { createStackNavigator } from "react-navigation";
import { ThemeProvider, Input } from "nachos-ui";

import AppScreen from '../App';
import LoadingScreen from '../src/pages/Loading';
import LoginScreen from '../src/pages/Login';
import EmailLoginScreen from '../src/pages/EmailLogin';
import HomeScreen from '../src/pages/Home';
import MusicScreen from '../src/pages/Music';
import SearchScreen from '../src/pages/Search';
import ListenPageScreen from '../src/pages/ListenPage';
import SongListScreen from '../src/pages/SongList';
import SongListDetailScreen from '../src/pages/SongListDetail';


export const AppNavigator = createStackNavigator({
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
  EmailLogin: {
    screen: EmailLoginScreen,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Music: {
    screen: MusicScreen,
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
  Listen: {
    screen: ListenPageScreen,
    navigationOptions: {
    }
  },
  SongList: {
    screen: SongListScreen,
    navigationOptions: {
    }
  },
  SongListDetail: {
    screen: SongListDetailScreen,
    navigationOptions: {
    }
  }

});


export default (MyApp = () => (
  <ThemeProvider
    branding={{
      primaryLightColor: "rgb(47, 140, 255)",
      primaryColor: "white"
    }}
  >
    <AppNavigator />
  </ThemeProvider>
))