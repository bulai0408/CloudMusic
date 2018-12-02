import { GET_SONG_ID_REQUEST } from '../constant';
import { PHONE_LOGIN_REQUEST, EMAIL_LOGIN_REQUEST } from '../constant';

const doPhoneLogin = (info, navigation) => {
  return {
    type: PHONE_LOGIN_REQUEST,
    info,
    navigation
  }
}

const doEmailLogin = (info, navigation) => {
  return {
    type: EMAIL_LOGIN_REQUEST,
    info,
    navigation
  }
}

export {
  doPhoneLogin,
  doEmailLogin
}