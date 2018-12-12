import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class ListeningControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songInfo: {}
    }
  }
  componentDidMount = async () => {
    const { song: { id }, control } = this.props;
    const songInfo = await this.getInfo();
    this.setState({ songInfo })
  }

  /** 控制器的歌曲信息 */
  getInfo = async () => {
    const { song: { id }, control } = this.props;
    const { data } = await axios.get(`song/detail?ids=${id}`);
    const { picUrl } = data.songs[0].al;
    const songName = data.songs[0].name;
    const singerName = data.songs[0].ar[0].name;
    // const musicUrl = data[0].url;
    return {
      songName,
      singerName,
      picUrl
    }
  }

  render() {
    const { song, control } = this.props;
    const { songInfo } = this.state;
    console.log(songInfo);
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image style={{ width: 40, height: 40, borderRadius: 4 }} source={{ uri: songInfo.picUrl }} />
          <View>
            <Text>{songInfo.singerName}</Text>
            <Text>{songInfo.songName}</Text>
          </View>
        </View>
        <View style={{backgroundColor:'blue',flex:1}}>
          <Text>开始</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // width: '100%',
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'column',

    // alignItems: 'center',
  },
  infoContainer: {
    // flexDirection: 'column',
    backgroundColor:'red'

  }
})

export default connect(state => ({ control: state.control, song: state.song }))(ListeningControl);