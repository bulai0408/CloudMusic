import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { doPhoneLogin } from '../redux/action/user';
class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我是popular</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'rgb(189, 193, 204)'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 4,
    marginTop: 10
  },
  Input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    marginLeft: 5,
    borderRadius: 4
  },
  inputArea: {
    width: '90%',
    margin: 5
  },
  button: {
    height: 50,
    marginTop: 10
  },
  input: {
    borderRadius: 4
  }

});

export default connect()(Popular)