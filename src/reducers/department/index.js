import { combineReducers } from 'redux';
import departments from './departments';
import departmentsAll from './departments_all';
import departmentForm from './department_form';
import departmentWindow from './department_window';
import departmentSearch from './department_search';

const departmentReducer = combineReducers({
  departments,
  departmentsAll,
  departmentForm,
  departmentWindow,
  departmentSearch,
});

export default departmentReducer;
