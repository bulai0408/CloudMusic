import {
  PHONE_LOGIN_REQUEST,
  EMAIL_LOGIN_REQUEST,
  PHONE_LOGIN_SUCCEED,
  EMAIL_LOGIN_SUCCEED,
  PHONE_LOGIN_FAILURE,
  EMAIL_LOGIN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCEED,
  LOG_OUT_FAILED
} from '../constant';

const initialState = {
  isFetching: false,
  error: null,
  user: null
}
const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case PHONE_LOGIN_REQUEST:
    case EMAIL_LOGIN_REQUEST:
      return {
        isFetching: true,
        error: null,
        user: null
      };
    case PHONE_LOGIN_SUCCEED:
    case EMAIL_LOGIN_SUCCEED:
      return {
        isFetching: false,
        error: null,
        user: action.user
      };
    case PHONE_LOGIN_FAILURE:
    case EMAIL_LOGIN_FAILURE:
      return {
        isFetching: false,
        error: action.error,
        user: null
      }
    case LOG_OUT_REQUEST:
      return {
        isFetching: true,
        error: null,
        user: state.user
      }
    case LOG_OUT_SUCCEED:
      return {
        isFetching: false,
        error: null,
        user: null
      }
    case LOG_OUT_FAILED:
      return {
        isFetching: false,
        error: action.error,
        user: state.user
      }
    default:
      return state;
  }
};

export default user;