import { combineReducers } from 'redux';
import hospitals from './hospitals';
import hospitalForm from './hospital_form';
import hospitalWindow from './hospital_window';
import hospitalModalWindow from './hospital_modal_window';
import hospitalDepartments from './hospital_departments';
import hospitalStudents from './hospital_students';
import hospitalSearch from './hospital_search';

const hospitalReducer = combineReducers({
  hospitalForm,
  hospitalWindow,
  hospitalModalWindow,
  hospitalDepartments,
  hospitalStudents,
  hospitals,
  hospitalSearch,
});

export default hospitalReducer;
