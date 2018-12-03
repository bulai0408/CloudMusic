import { GET_CONTROL_REQUEST, GET_CONTROL_SUCCEED, GET_CONTROL_FAILED } from '../constant';

const initalState = {
  main: null,
  status: 0,
  error: null
}
const control = (state = initalState, action = {}) => {
  switch (action.type) {
    case GET_CONTROL_REQUEST:
      return {
        ...state
      };
    case GET_CONTROL_SUCCEED:
      return {
        main: action.control,
        status: 1,
        error: null
      };
    case GET_CONTROL_FAILED:
      return {
        main: null,
        status: 0,
        error: action.error
      };
    default:
      return state;
  }
};

export default control;