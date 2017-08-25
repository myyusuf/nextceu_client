import { combineReducers } from 'redux';
import studentReducers from './student/';
import hospitalReducers from './hospital/';
import seminarReducers from './seminar/';
import uploadReducers from './upload/';

const rootReducer = combineReducers({
  studentReducers,
  hospitalReducers,
  seminarReducers,
  uploadReducers,
});

export default rootReducer;
