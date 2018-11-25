const getUserInfo = (user) => {
  return {
    type: 'GET_USER_INFO',
    user
  }
}

const doPhoneLogin = (info, navigation) => {
  return {
    type: 'PHONE_LOGIN_REQUEST',
    info,
    navigation
  }
}

const doEmailLogin = (info, navigation) => {
  return {
    type: 'EMAIL_LOGIN_REQUEST',
    info,
    navigation
  }
}

export {
  getUserInfo,
  doPhoneLogin,
  doEmailLogin
}