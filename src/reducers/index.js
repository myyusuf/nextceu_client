import { combineReducers } from 'redux';
import studentReducers from './student/index';

const rootReducer = combineReducers({
  studentReducers,
});

export default rootReducer;
