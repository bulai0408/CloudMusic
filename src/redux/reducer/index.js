import { combineReducers } from 'redux'

import user from './user';
import song from './song';

const rootReducer = combineReducers({
  user,
  song
})

export default rootReducer;