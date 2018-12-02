import { GET_CONTROL_REQUEST } from '../constant';

const getControl = (control, navigation) => {
  return {
    type: GET_CONTROL_REQUEST,
    control,
    navigation
  }
}

export {
  getControl
}