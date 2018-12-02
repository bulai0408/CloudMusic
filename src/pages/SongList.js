import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';

import { doPhoneLogin } from '../redux/action/user';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenu: [{
        title: '本地音乐',
        content: '100'
      }, {
        title: '最近播放',
        content: '50'
      }, {
        title: '下载管理',
        content: '0'
      }, {
        title: '我的电台',
        content: '0'
      }, {
        title: '我的收藏',
        content: '专辑/歌手/视频/专栏'
      }, {
        title: 'Sati空间',
        content: '特别的聆听模式'
      }],
      playlist: [],
      userId: 0,
      createHide: false,
      subscribeHide: false,
    }
  }

  componentDidMount = async () => {
    this.getSongList();
  }

  getSongList = async () => {
    try {
      // const { user: { user: { id } } } = this.props;
      const id = 116368939;
      const { data: { playlist } } = await axios.get(`user/playlist?uid=${id}`);
      this.setState({ playlist, userId: id })
    } catch (e) {
    }
  }

  changeCreateHide = () => {
    this.setState({
      createHide: !this.state.createHide
    })
  }

  changeSubscribeHide = () => {
    this.setState({
      subscribeHide: !this.state.subscribeHide
    })
  }

  /**跳转到歌单详情界面，携带歌单id */
  toSongListDetail = (item) => {
    this.props.navigation.navigate('SongListDetail', {
      id: item.id
    })
  }

  render() {
    const { topMenu, playlist, userId } = this.state;
    const menuRender = topMenu.map((item, index) => (
      <View key={index.toString()} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' }}>
        <Icon name='ios-musical-notes' size={30} tabLabel='ios-musical-notes' style={{ paddingLeft: 10, paddingRight: 10 }} />
        <Text>{item.title}</Text>
        <Text>（{item.content}）</Text>
      </View>
    ))

    const createList = playlist.filter(item => item.creator.userId === userId)
    const subscribeList = playlist.filter(item => item.creator.userId !== userId)

    const { createHide, subscribeHide } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {menuRender}
          <TouchableOpacity activeOpacity={1} onPress={this.changeCreateHide}>
            <View style={{ padding: 8, backgroundColor: '#DCDCDC', flexDirection: 'row', alignItems: 'center' }}>
              <View style={createHide ? '' : styles.create}>
                <View style={styles.icon} />
              </View>
              <Text style={{ marginLeft: 10 }} >创建的歌单</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={createList}
            style={[{ paddingLeft: 5, paddingRight: 5 }, createHide ? styles.createlist : '']}
            keyExtractor={(item) => (item.id).toString()}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0} onPress={() => { this.toSongListDetail(item) }}>
                <View key={item.id} style={{ flexDirection: 'row', paddingTop: 3, paddingBottom: 3 }}>
                  <Image style={{ width: 50, height: 50, borderRadius: 4, marginRight: 8 }} source={{ uri: item.coverImgUrl }} />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ marginBottom: 5 }}>{item.name}</Text>
                    <Text>{item.trackCount}首</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity activeOpacity={1} onPress={this.changeSubscribeHide}>
            <View style={{ padding: 8, backgroundColor: '#DCDCDC', flexDirection: 'row', alignItems: 'center' }}>
              <View style={subscribeHide ? '' : styles.subscribe}>
                <View style={styles.icon} />
              </View>
              <Text style={{ marginLeft: 10 }} >收藏的歌单</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={subscribeList}
            style={[{ paddingLeft: 5, paddingRight: 5 }, subscribeHide ? styles.subscribelist : '']}
            keyExtractor={(item) => (item.id).toString()}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0} onPress={() => { this.toSongListDetail(item) }}>
                <View key={item.id} style={{ flexDirection: 'row', paddingTop: 3, paddingBottom: 3 }}>
                  <Image style={{ width: 50, height: 50, borderRadius: 4, marginRight: 8 }} source={{ uri: item.coverImgUrl }} />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ marginBottom: 5 }}>{item.name}</Text>
                    <Text>{item.trackCount}首 by {item.creator.nickname}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  create: {
    transform: [{ rotate: '90deg' }]
  },
  subscribe: {
    transform: [{ rotate: '90deg' }]
  },
  createlist: {
    height: 0
  },
  subscribelist: {
    height: 0
  },
  icon: {
    width: 8,
    height: 8,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#999',
    borderBottomColor: '#999',
    transform: [{ rotateZ: '-135deg' }],
  }
});

export default connect(state => ({ user: state.user }))(SongList)