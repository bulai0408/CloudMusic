import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';

export default class EmailLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    }
  }

  //登录
  onPress = async () => {
    const { email, password } = this.state;
    try {
      const { data } = await axios.get('login', {
        params: {
          email,
          password
        }
      });
      const resetToHome = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      });
      this.props.navigation.dispatch(resetToHome);
    } catch (error) {
      console.dir(error.respoonse.data.msg);
    }
  }

  //切换至手机号登录
  changeToPhone = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    const { phone, password } = this.state;
    return (
      <View style={styles.container}>
        <H2 style={styles.welcome}>邮箱登录</H2>
        <View style={styles.inputArea}>
          <Input
            placeholder='邮箱账号'
            style={styles.input}
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={styles.inputArea}>
          <Input
            placeholder='密码'
            style={styles.input}
            value={password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={this.onPress}>登录</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={this.changeToPhone}>切换至手机号登录</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
