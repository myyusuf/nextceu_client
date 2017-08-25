import { combineReducers } from 'redux';
import seminars from './seminars';

const seminarReducer = combineReducers({
  seminars,
});

export default seminarReducer;
