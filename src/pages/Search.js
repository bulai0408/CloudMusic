import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input,Button } from 'nachos-ui';
import axios from 'axios';
import Sound from 'react-native-sound';


import { BACKGROUND_COLOR } from '../constant'

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      songs: undefined
    }
  }


  goBack = () => {
    this.props.navigation.goBack()
  }

  onSearch = async () => {
    const { searchText } = this.state;
    const { data: { result } } = await axios.get(`search?keywords=${searchText}`);
    console.log(result);
    const { songs } = result;
    this.setState({ songs })

  }

  getSource = async (id) => {
    const { data: { data } } = await axios.get(`song/url?id=${id}`);
    const song = data[0];
    console.log(song);
    const Sound = this.Sound(song.url);
    // this.setState({ song, Sound });
    // this.props.navigation.navigate('Music', {
    //   musicItem: song
    // });
  }

  //播放器
  Sound = (url) => {
    const whoosh = new Sound(url, null, (e) => {
      if (e) {
        console.log('播放失败');
        return;
      }
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
    const { } = this.state;
    const { searchText, songs, } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ height: 77, paddingTop: 32, backgroundColor: BACKGROUND_COLOR, flexDirection: 'row', alignItems: 'center' }}>
          <Icon onPress={this.goBack} name='ios-arrow-back' style={{ color: 'white', paddingLeft: 20, marginRight: 20, paddingBottom: 10 }} size={30} tabLabel='ios-arrow-back' />
          <View style={{ flex: 1, marginBottom: 10, marginRight: 10, paddingBottom: 10 }}>
            <Input
              value={searchText}
              placeholder='搜索'
              placeholderTextColor='white'
              style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, backgroundColor: BACKGROUND_COLOR }}
              inputStyle={{ marginTop: 5, color: 'white' }}
              onChangeText={searchText => { this.setState({ searchText }) }}
              onSubmitEditing={this.onSearch}
            />
          </View>
        </View>
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
