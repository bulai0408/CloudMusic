import { POST_ADD_SONGLIST, POST_ADD_SONGLIST_SUCCEED, POST_ADD_SONGLIST_FAILURE } from '../constant';

const initalState = {
  isFetching: false,
  error: null,
  songListInfo: null
}
const songList = (state = initalState, action = {}) => {
  console.log(state,action);
  switch (action.type) {
    case POST_ADD_SONGLIST:
      return {
        isFetching: true,
        error: null,
        songListInfo: null,
      };
    case POST_ADD_SONGLIST_SUCCEED:
      return {
        isFetching: false,
        error: null,
        songListInfo: action.songListInfo
      };
    case POST_ADD_SONGLIST_FAILURE:
      return {
        isFetching: false,
        error: action.error,
        songListInfo: null
      };
    default:
      return state;
  }
};

export default songList;