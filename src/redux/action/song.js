import { GET_CONTROL_REQUEST } from '../constant';
import { GET_SONG_ID_REQUEST } from '../constant';

const getSongId = (id, navigation) => {
  return {
    type: GET_SONG_ID_REQUEST,
    id,
    navigation
  }
}

export {
  getSongId,
}