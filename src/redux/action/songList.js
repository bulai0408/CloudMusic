import { POST_ADD_SONGLIST } from '../constant';

const addSongList = (name) => {
  console.log(name);
  return {
    type: POST_ADD_SONGLIST,
    name,
  }
}


export {
  addSongList
}