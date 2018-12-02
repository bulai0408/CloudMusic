import { GET_SONG_ID_REQUEST, GET_SONG_ID_SUCCEED, GET_SONG_ID_FAILED } from '../constant';

const initalState = {
  isFetching: false,
  error: null,
  id: null
}
const song = (state = initalState, action = {}) => {
  switch (action.type) {
    case GET_SONG_ID_REQUEST:
      return {
        isFetching: true,
        error: null,
        id: null
      };
    case GET_SONG_ID_SUCCEED:
      return {
        isFetching: false,
        error: null,
        id: action.id
      };
    case GET_SONG_ID_FAILED:
      return {
        isFetching: false,
        error: action.error,
        id: null
      };
    default:
      return state;
  }
};

export default song;