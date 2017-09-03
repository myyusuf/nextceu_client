import { combineReducers } from 'redux';
import reports from './reports';
import costUnitSearch from './cost_unit_search';

const reportReducer = combineReducers({
  reports,
  costUnitSearch,
});

export default reportReducer;
