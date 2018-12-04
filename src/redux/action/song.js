import { GET_SONG_ID_REQUEST, GET_PREV_SONG_ID } from '../constant';

const getSongId = (id, navigation) => {
  return {
    type: GET_SONG_ID_REQUEST,
    id,
    navigation
  }
}

const getPrevSongId = (prevId, navigation) => {
  return {
    type: GET_PREV_SONG_ID,
    prevId,
    navigation
  }
}

export {
  getSongId,
  getPrevSongId
}