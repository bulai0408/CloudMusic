import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { Button, Input } from 'nachos-ui';
import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

export default class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Song: undefined,
      musicItem: undefined
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const musicItem = navigation.getParam('musicItem', '暂无');
    const { url } = musicItem;
    this.setState({ musicItem });
    console.log(url)

  }

  onStart = () => {
    const { musicItem } = this.state;
    const whoosh = new Sound(musicItem.url, null, (e) => {
      if (e) {
        console.log(e);
        return;
      }
      whoosh.play(() => whoosh.release());
    });
    this.setState({ Song: whoosh });
  }


  render() {
    const { navigation } = this.props;
    const musicItem = navigation.getParam('musicItem', '暂无');
    return (
      <View style={styles.container}>
        <Text onPress={this.onStart}>{musicItem.url}</Text>
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
