import { combineReducers } from 'redux';
import hospitalForm from './hospital_form';
import hospitalWindow from './hospital_window';
import hospitalModalWindow from './hospital_modal_window';
import hospitalDepartments from './hospital_departments';
import hospitalStudents from './hospital_students';

const hospitalReducer = combineReducers({
  hospitalForm,
  hospitalWindow,
  hospitalModalWindow,
  hospitalDepartments,
  hospitalStudents,
});

export default hospitalReducer;
