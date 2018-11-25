import Toast from 'react-native-root-toast';

const toast = (
  content = '服务器开小差了',
  position = 'TOP'
) => Toast.show(content, {
  duration: Toast.durations.LONG,
  position: typeof position === 'number' ? position : Toast.positions[position],
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  onShow: () => {
    // calls on toast\`s appear animation start
  },
  onShown: () => {
    // calls on toast\`s appear animation end.
  },
  onHide: () => {
    // calls on toast\`s hide animation start.
  },
  onHidden: () => {
    // calls on toast\`s hide animation end.
  }
});

export default toast;