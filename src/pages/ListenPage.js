import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';

import { getControl } from '../redux/action/control';
import { getSongId } from '../redux/action/song';

class ListenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0, //0暂停，1播放
      musicUrl: '',
      imgUrl: '',
    }
  }

  componentDidMount = () => {
    this.startSong();
  }

  startSong = async () => {
    const { navigation, song: { id } } = this.props;
    Promise.all([
      axios.get(`song/url?id=${id}`),
      axios.get(`song/detail?ids=${id}`)
    ])
      .then(res => {
        const musicUrl = res[0].data.data[0].url;
        const imgUrl = res[1].data.songs[0].al.picUrl;
        if (!musicUrl) {
          navigation.goBack();
          return;
        }
        this.Control = this.Sound(musicUrl);
        this.setState({
          musicUrl,
          imgUrl,
          status: 1
        })
      });
  }

  //播放器
  Sound = (url) => {
    const whoosh = new Sound(url, null, (e) => {
      if (e) {
        return;
      }
      whoosh.play(() => whoosh.release());
    });
    return whoosh;
  }

  //暂停或播放
  onControl = () => {
    const { status } = this.state;
    const { navigation } = this.props;
    getSongId(666, navigation);
    console.log(getControl);
    const statusArray = [0, 1];
    status === statusArray[0] && this.onGo()
    status === statusArray[1] && this.onPause();
  }

  //暂停播放
  onPause = () => {
    this.Control.pause();
    this.setState({ status: 0 })
  }

  //继续播放
  onGo = () => {
    this.Control.play();
    this.setState({ status: 1 })
  }

  //结束播放
  onStop = () => {
    this.Control.stop();
    this.setState({ status: 0 })
  }

  componentWillUnmount = () => {
    console.log('88')
    // this.Control.stop();
  }

  render() {
    console.log(this.props.control);
    const { imgUrl } = this.state;

    const Picture = imgUrl ? (
      <Image style={{ width: 200, height: 200, borderRadius: 100 }} source={{ uri: imgUrl }} />
    ) : undefined

    return (
      <View style={styles.container}>
        {Picture}
        <View style={styles.button}>
          <Button onPress={this.onControl}>暂停/播放</Button>
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

export default connect(state => ({ song: state.song, control: state }), { getControl })(ListenPage);
