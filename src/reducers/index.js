import { combineReducers } from 'redux';
import studentReducers from './student/';

const rootReducer = combineReducers({
  studentReducers,
});

export default rootReducer;
