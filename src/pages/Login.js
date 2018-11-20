import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      email: ''
    }
  }

  //登录
  onPress = async () => {
    const { phone, password } = this.state;
    try {
      const { data } = await axios.get('login/cellphone', {
        params: {
          phone,
          password
        }
      });
      console.log(data);
    } catch (error) {
      console.dir(error.respoonse.data.msg);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>请登录</Text>
        <View style={styles.inputArea}>
          <Text>手机号:</Text>
          <TextInput style={styles.Input} onChangeText={(phone) => this.setState({ phone })}></TextInput>
        </View>
        <View style={styles.inputArea}>
          <Text>密码:</Text>
          <TextInput style={styles.Input} onChangeText={(password) => this.setState({ password })}></TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>切换至邮箱登录</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5
  },

});
