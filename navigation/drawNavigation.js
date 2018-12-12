import React from 'react';
import { createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../src/pages/Home';
import { doLogout } from '../src/redux/action/user'

const AAA = (props) => {
  aaa = () => {
    console.log(props);
    props.navigation.openDrawer();
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={aaa}>AAA</Text>
    </View>
  )
}
const BBB = () => (
  <View>
    <Text>BBB</Text>
  </View>
)
const CCC = () => (
  <View>
    <Text>CCC</Text>
  </View>
)

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onLogout = () => {
    const { navigation, doLogout } = this.props;
    doLogout(navigation)
  }
  render() {
    const { user: { user } } = this.props;
    console.log(user);
    // const { nickname, backgroundUrl } = profile;
    const avatarUrl = 'https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg';
    const nickname = '丶不赖';

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView  forceInset={{ top: 'always', horizontal: 'never' }}>
          <Image style={{ width: 50, height: 50, borderRadius: 25,marginLeft:15 }} source={{ uri: avatarUrl }} />
          <Text>{nickname}</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
        </SafeAreaView>
        <SafeAreaView style={{ justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F2F2F2', flexDirection: 'row', padding: 8 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
            <Icon name='ios-moon' size={25} tabLabel='ios-moon' style={{ color: 'black', marginRight: 5 }} />
            <Text style={{ fontSize: 14 }}>夜间模式</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name='ios-settings' size={25} tabLabel='ios-settings' style={{ color: 'black', marginRight: 5 }} />
            <Text style={{ fontSize: 14 }}>设置</Text>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={this.onLogout}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
              <Icon name='ios-power' size={25} tabLabel='ios-power' style={{ color: 'black', marginRight: 5 }} />
              <Text style={{ fontSize: 14 }}>退出</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    )
  }
}

const DrawerContent = connect(state => ({ user: state.user }), { doLogout })(CustomDrawerContentComponent)


const DrawNavigator = createDrawerNavigator(
  {
    AAA: { screen: AAA },
    BBB: { screen: BBB },
    CCC: { screen: CCC },
    Home: { screen: Home },
  }, {
    drawerWidth: 330, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    initialRouteName: 'Home', // 默认页面组件
    contentComponent: DrawerContent,
    contentOptions: {
      activeItemKey: 'Notifications',
      labelStyle: {//标签样式
        // color : 'red',
        height: 20,
      },
      activeTintColor: 'white',  // 选中文字颜色
      activeBackgroundColor: '#ff8500', // 选中背景颜色
      inactiveTintColor: '#666',  // 未选中文字颜色
      inactiveBackgroundColor: '#fff', // 未选中背景颜色
      style: {  // 样式
        marginVertical: 0,
      },
      //没有作用
      onItemPress: (route) => {
        console.log('-------->' + JSON.stringify(route))
      },

    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default DrawNavigator;