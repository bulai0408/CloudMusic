import { combineReducers } from 'redux'

import user from './user';
import song from './song';
import control from './control';
import songList from './songList';

const rootReducer = combineReducers({
  user,
  song,
  control,
  songList
})

export default rootReducer;