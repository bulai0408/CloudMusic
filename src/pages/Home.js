import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { Button, Input } from 'nachos-ui';
import Sound from 'react-native-sound';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';

import FacebookTabBar from '../components/FacebookTabBar';
import { BACKGROUND_COLOR } from '../constant';

// Enable playback in silence mode
Sound.setCategory('Playback');

const Container1 = () => (
  <View>
    <Text>我是1</Text>
  </View>
)

const Container2 = () => (
  <View>
    <Text>我是2</Text>
  </View>
)

const Container3 = () => (
  <View>
    <Text>我是3</Text>
  </View>
)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '', //用户搜索的内容
      songs: [],
      song: undefined,
      isStart: false,
      Sound: undefined
    }
  }

  onSearch = async () => {
    const { searchText } = this.state;
    const { data: { result } } = await axios.get(`search?keywords=${searchText}`);
    const { songs, songCount } = result;
    this.setState({ songs })

  }

  getSource = async (id) => {
    const { data: { data } } = await axios.get(`song/url?id=${id}`);
    const song = data[0];
    // const Sound = this.Sound(song.url);
    // this.setState({ song, Sound });
    this.props.navigation.navigate('Music', {
      musicItem: song
    });
  }

  //播放器
  Sound = (url) => {
    const whoosh = new Sound(url, null, (e) => {
      if (e) {
        console.log('播放失败');
        return;
      }
      this.setState({ isStart: true })
      whoosh.play(() => whoosh.release());
    });
    return whoosh;
  }

  //暂停播放
  onPause = () => {
    const { Sound } = this.state;
    Sound.pause();
  }

  //继续播放
  onGo = () => {
    const { Sound } = this.state;
    Sound.play();
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollableTabView
          style={styles.topView}
          renderTabBar={() => <FacebookTabBar style={{ paddingTop: 32, height: 77, backgroundColor: BACKGROUND_COLOR }} navigation={this.props.navigation} />}
          initialPage={1}
        >
          <Container1 name='ios-person' tabLabel="ios-musical-note" />
          <Container2 name='music-square' tabLabel='ios-musical-notes' />
          <Container3 name='ios-tv' tabLabel="ios-tv" />
        </ScrollableTabView>
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
  topView: {
    // paddingTop: 22,
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
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
  song: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default connect(state => ({ user: state.user }))(Home);
