import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import axios from 'axios';
import { Button, Input, H2 } from 'nachos-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';

import { getControl } from '../redux/action/control';
import { getPrevSongId } from '../redux/action/song';


class ListenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1, //0暂停，1播放
      musicUrl: '',
      imgUrl: '',
      bounceValue: new Animated.Value(1),
      rotateValue: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    this.ifChangeSong();
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.bounceValue.setValue(1);//和上面初始值一样，所以
    //弹动没有变化
    this.state.rotateValue.setValue(0);
    Animated.parallel([
      //通过Animated.spring等函数设定动画参数
      //可选的基本动画类型: spring, decay, timing
      Animated.spring(this.state.bounceValue, {
        toValue: 1,      //变化目标值，也没有变化
        friction: 20,    //friction 摩擦系数，默认40
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 1,  //角度从0变1
        duration: 15000,  //从0到1的时间
        easing: Easing.out(Easing.linear),//线性变化，匀速旋转
      }),
      //调用start启动动画,start可以回调一个函数,从而实现动画循环
    ]).start(() => this.startAnimation());
  }

  //是否换歌
  ifChangeSong = async () => {
    const { song: { id, prevId }, getPrevSongId } = this.props;
    if (id === prevId) { //后退后播放同一首
      const { data } = await axios.get(`song/detail?ids=${id}`);
      const imgUrl = data.songs[0].al.picUrl;
      this.setState({ imgUrl });
      return;
    };
    if (!prevId) { //如果是听第一首歌
      await this.startSong();
      getPrevSongId(id);
      return;
    }
    await this.initialStop();
    await this.startSong();
    getPrevSongId(id);
  }

  //初始化时停止在播音乐
  initialStop = () => {
    if (!this.onStop()) return;
    const { song: { id } } = this.props;

    this.onStop();
  }

  startSong = async () => {
    const { navigation, song: { id }, getControl } = this.props;
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
        getControl(this.Control, navigation); //同步控制器到redux
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
    const { control } = this.props;
    console.log(status);
    const statusArray = [0, 1];
    status === statusArray[0] && this.onGo()
    status === statusArray[1] && this.onPause();
  }

  //暂停播放
  onPause = () => {
    const { control: { main } } = this.props;
    if (!main) return false;
    main.pause();
    this.setState({ status: 0 })
  }

  //继续播放
  onGo = () => {
    const { control: { main } } = this.props;
    if (!main) return false;
    main.play();
    this.setState({ status: 1 })
  }

  //结束播放
  onStop = () => {
    const { control: { main } } = this.props;
    if (!main) return false;
    main.stop();
    this.setState({ status: 0 })
    return true;
  }

  componentWillUnmount = () => {
    console.log('88')
  }

  render() {
    const { imgUrl, bounceValue, rotateValue } = this.state;




    const Picture = imgUrl ? (
      <Animated.Image
        style={[{ width: 200, height: 200, borderRadius: 100 }, {
          transform: [
            //将初始化值绑定到动画目标的style属性上
            { scale: bounceValue },
            //使用interpolate插值函数,实现了从数值单位的映
            //射转换,上面角度从0到1，这里把它变成0-360的变化
            {
              rotateZ: rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })
            }]
        }]}
        source={{ uri: imgUrl }} />
    ) : undefined

    return (
      <View style={styles.container}>
        {Picture}
        <View style={styles.button}>
          <Button onPress={this.onControl}>暂停/播放</Button>
          <Button onPress={this.onStop}>停止</Button>
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

export default connect(state => ({ song: state.song, control: state.control }), { getControl, getPrevSongId })(ListenPage);
