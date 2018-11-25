import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { doEmailLogin } from '../redux/action/user';
class EmailLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      emailStatus: 'normal',
      passwordStatus: 'normal',
    }
  }

  //登录
  onPress = async () => {
    const { email, password } = this.state;
    if (!email) {
      this.setState({ emailStatus: 'error' });
      return;
    }
    this.setState({ emailStatus: 'normal' });
    if (!password) {
      this.setState({ passwordStatus: 'error' });
      return;
    }
    this.setState({ passwordStatus: 'normal' });
    const { doEmailLogin, navigation } = this.props;
    doEmailLogin({ email, password }, navigation);
  }

  //切换至手机号登录
  changeToPhone = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    const { email, password, emailStatus, passwordStatus } = this.state;
    const { user: { isFetching } } = this.props;
    return (
      <View style={styles.container}>
        <Spinner
          visible={isFetching}
          textContent={'拼命加载中...'}
          textStyle={{ color: '#FFF', fontSize: 15, marginBottom: 60 }}
        />
        <H2 style={styles.welcome}>邮箱登录</H2>
        <View style={styles.inputArea}>
          <Input
            placeholder='邮箱账号'
            style={styles.input}
            value={email}
            status={passwordStatus}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputArea}>
          <Input
            placeholder='密码'
            style={styles.input}
            value={password}
            status={passwordStatus}
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

export default connect(state => ({ user: state.user }), { doEmailLogin })(EmailLogin)
