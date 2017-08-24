import { combineReducers } from 'redux';
import studentReducers from './student/';
import hospitalReducers from './hospital/';

const rootReducer = combineReducers({
  studentReducers,
  hospitalReducers,
});

export default rootReducer;
