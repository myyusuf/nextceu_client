import { combineReducers } from 'redux';
import reports from './reports';

const reportReducer = combineReducers({
  reports,
});

export default reportReducer;
