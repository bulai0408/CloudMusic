const initalState = {
  isFetching: false,
  error: null,
  song: null
}
const song = (state = initalState, action = {}) => {
  switch (action.type) {
    case 'GET_SONG_URL':
      return {
        isFetching: true,
        error: null,
        song: { ...state.song }
      };
    case 'GET_SONG_URL_SUCCEED':
      return {
        isFetching: false,
        error: null,
        song: {
          ...state.song,
          url: action.url
        }
      };
    case 'GET_SONG_URL_FAILED':
      return {
        isFetching: false,
        error: action.error,
        song: { ...state.song }
      };
    case 'GET_SONG_DETAIL':
      return {
        isFetching: true,
        error: null,
        song: {
          ...state.song
        }
      };
    case 'GET_SONG_DETAIL_SUCCEED':
      return {
        isFetching: false,
        error: null,
        song: {
          ...state.song,
          detail: action.detail
        }
      };
    case 'GET_SONG_DETAIL_FAILED':
      return {
        isFetching: true,
        error: action.error,
        song: {
          ...state.song
        }
      };
    default:
      return state;
  }
};

export default song;