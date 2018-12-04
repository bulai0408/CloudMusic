import { GET_SONG_ID_REQUEST, GET_SONG_ID_SUCCEED, GET_SONG_ID_FAILED,GET_PREV_SONG_ID } from '../constant';

const initalState = {
  isFetching: false,
  error: null,
  id: null,
  prevId:null
}
const song = (state = initalState, action = {}) => {
  switch (action.type) {
    case GET_SONG_ID_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        id: null,
      };
    case GET_SONG_ID_SUCCEED:
      return {
        ...state,
        isFetching: false,
        error: null,
        id: action.id
      };
    case GET_SONG_ID_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        id: null
      };
    case GET_PREV_SONG_ID:
    return{
      ...state,
      prevId:action.prevId
    }
    default:
      return state;
  }
};

export default song;