import { combineReducers } from 'redux';
import uploads from './uploads';

const uploadReducer = combineReducers({
  uploads,
});

export default uploadReducer;
