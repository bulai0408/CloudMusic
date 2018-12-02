import { combineReducers } from 'redux'

import user from './user';
import song from './song';
import control from './control';

const rootReducer = combineReducers({
  user,
  song,
  control
})

export default rootReducer;