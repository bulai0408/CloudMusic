import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input, Button } from 'nachos-ui';
import axios from 'axios';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';


import { BACKGROUND_COLOR } from '../constant'
import { getSongId } from '../redux/action/song';

class Search extends Component {

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
    const { songs } = result;
    console.log(result);
    this.setState({ songs })
  }

  getSource = (detail) => {
    const { getSongId, navigation } = this.props;
    getSongId(detail.id, navigation);
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
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0} onPress={() => { this.getSource(item) }}>
              <View style={styles.song} >
                <View style={{ alignItems: 'flex-start', flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{ marginBottom: 5, fontSize: 15 }}>{item.name}</Text>
                  {/* 音乐名 */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{ fontSize: 11, color: '#87CEFA' }}>{item.artists[0].name}</Text>
                    {/* 歌手名 */}
                    <View style={{ backgroundColor: 'black', width: 4, height: 1, marginLeft: 3, marginRight: 3 }} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{ fontSize: 11, color: '#8B8989', flex: 1 }}>{item.album.name}</Text>
                    {/* 专辑名 */}
                  </View>
                  {/* {(Array.isArray(item.alias) && item.alias.length > 0) && <Text style={{ marginTop: 5, fontSize: 13, color: '#8B8989' }}>{item.alias[0]}</Text>} */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    height: 50,
    marginTop: 10
  },
  song: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#F2F2F2'
  }
});

export default connect(state => ({ song: state.song }), { getSongId })(Search)