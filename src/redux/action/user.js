import { PHONE_LOGIN_REQUEST, EMAIL_LOGIN_REQUEST, LOG_OUT_REQUEST } from '../constant';

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

const doLogout = (navigation) => {
  return {
    type: LOG_OUT_REQUEST,
    navigation
  }
}

export {
  doPhoneLogin,
  doEmailLogin,
  doLogout
}