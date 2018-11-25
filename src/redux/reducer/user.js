const initialState = {
  isFetching: false,
  error: null,
  user: null
}
const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'PHONE_LOGIN_REQUEST':
    case 'EMAIL_LOGIN_REQUEST':
      return {
        isFetching: true,
        error: null,
        user: null
      };
    case 'PHONE_LOGIN_SUCCEED':
    case 'EMAIL_LOGIN_SUCCEED':
      return {
        isFetching: false,
        error: null,
        user: action.user
      };
    case 'PHONE_LOGIN_FAILURE':
    case 'EMAIL_LOGIN_FAILURE':
      return {
        isFetching: false,
        error: action.error,
        user: null
      }
    default:
      return state;
  }
};

export default user;