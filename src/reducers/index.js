import { combineReducers } from 'redux';
import studentReducers from './student/';
import hospitalReducers from './hospital/';
import seminarReducers from './seminar/';

const rootReducer = combineReducers({
  studentReducers,
  hospitalReducers,
  seminarReducers,
});

export default rootReducer;
