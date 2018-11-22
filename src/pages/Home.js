import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { Button, Input } from 'nachos-ui';
import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

export default class Home extends Component {
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
      musicItem:song
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
    const { searchText, songs, isStart } = this.state;
    const data = this.props.navigation.getParam('data', 'Peter');
    const controlMenu = isStart ? (<View style={{ marginTop: 10 }}>
      <View style={styles.button}>
        <Button onPress={this.onPause}>暂停</Button>
      </View>
      <View style={styles.button}>
        <Button onPress={this.onGo}>继续</Button>
      </View>
    </View>) : undefined

    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Input
            placeholder='搜索'
            style={styles.input}
            value={searchText}
            onChangeText={searchText => this.setState({ searchText })}
            onSubmitEditing={this.onSearch}
          />
        </View>
        {controlMenu}
        <FlatList
          data={songs}
          keyExtractor={(item) => (item.id).toString()}
          renderItem={({ item }) => (<View style={styles.song} >
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginBottom: 5 }}>{item.name}</Text>
              {/* 音乐名 */}
              <Text>{item.artists[0].name}</Text>
              {/* 歌手名 */}
            </View>
            <View style={styles.button}>
              <Button onPress={() => { this.getSource(item.id) }}>播放</Button>
            </View>
          </View>)}
        />
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
    marginTop: 22,
    width: '100%',
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