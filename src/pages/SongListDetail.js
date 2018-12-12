import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';

import { getSongId } from '../redux/action/song';
import toast from '../util';
import ListeningControl from '../components/ListeningControl';

class SongListDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songListSource: [], //歌单内容
      isFetching: false//加载状态
    }
  }

  componentDidMount = async () => {
    this.setState({ isFetching: true });
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const { data: { playlist: { tracks } } } = await axios.get(`/playlist/detail?id=${id}`);
    const newTracks = tracks.map(item => {
      return {
        album: item.al, //专辑
        singer: item.ar[0], //歌手信息
        name: item.name, //歌单名
        id: item.id, //歌曲id
      }
    });
    this.setState({
      songListSource: newTracks,
      isFetching: false
    }, () => console.log(this.state.songListSource))
    // const list = [];
    // const hasSongCanUse = tracks.map(item => {
    //   return Promise.all([
    //     axios.get(`check/music?id=${item.id}`),
    //     axios.get(`song/url?id=${item.id}`)
    //   ])
    //     .then(res => {
    //       const thisKeys = {};
    //       res.forEach(i => {
    //         const { data } = i;
    //         if (data.message === 'ok' || data.message === '亲爱的,暂无版权') {
    //           thisKeys.permission = data.success;
    //         } else if (data.data[0].url) {
    //           thisKeys.url = data.data[0].url
    //         }
    //       })
    //       list.push({ ...item, ...thisKeys })
    //     })
    // });
    // Promise.all(hasSongCanUse)//判断音乐是否可用
    //   .then(res => {
    //     const showingSource = list.map(item => {
    //       return {
    //         album: item.al, //专辑
    //         singer: item.ar[0], //歌手信息
    //         name: item.name, //歌单名
    //         id: item.id, //歌单id
    //         permission: item.permission //是否可用
    //       }
    //     });
    //     this.setState({
    //       songListSource: showingSource,
    //       isFetching: false
    //     })
    //   })
  }

  /**跳转到听歌界面 入参歌曲详情 跳转传参歌曲 */
  toListenPage = async (detail) => {
    const { getSongId, navigation } = this.props;
    const { data } = await axios.get(`check/music?id=${detail.id}`);
    if (!data.success) {
      toast('暂无版权...', 'TOP');
      return;
    }
    getSongId(detail.id, navigation) //将当前播放音乐的id存放在redux
  }

  render() {

    const { songListSource, isFetching } = this.state;
    const { song, control } = this.props;
    const { id } = song;
    const { status } = control;


    const showingList = (
      <FlatList
        data={songListSource}
        style={[{ paddingLeft: 5, paddingRight: 5 }]}
        keyExtractor={(item) => (item.id).toString()}
        extraData={songListSource}
        // ListEmptyComponent={() => <Text>暂无</Text>}
        renderItem={i => {
          const { item } = i;
          return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.toListenPage(item)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ width: 40, textAlign: 'center' }}>{i.index + 1}</Text>
                <View style={{ borderBottomColor: '#F2F2F2', borderBottomWidth: 1, padding: 8, flex: 1 }}>
                  <Text
                    style={{ marginBottom: 5 }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                  >{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                    >{item.singer.name}</Text>
                    <View style={{ backgroundColor: 'black', width: 4, height: 1, marginLeft: 3, marginRight: 3 }} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{ flex: 1 }}
                    >{item.album.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    )



    return (
      <View style={styles.container}>
        <Spinner
          visible={isFetching}
          textContent={'拼命加载中...'}
          textStyle={{ color: '#FFF', fontSize: 15, marginBottom: 60 }}
        />
        {showingList}
        {(id && status === 1) ? <ListeningControl /> : null}
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
  },
});

export default connect(state => ({ song: state.song, control: state.control }), { getSongId })(SongListDetail)