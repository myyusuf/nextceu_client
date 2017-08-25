import { combineReducers } from 'redux';
import departments from './departments';
import departmentForm from './department_form';
import departmentWindow from './department_window';

const departmentReducer = combineReducers({
  departments,
  departmentForm,
  departmentWindow,
});

export default departmentReducer;
