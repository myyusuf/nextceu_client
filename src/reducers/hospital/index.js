import { combineReducers } from 'redux';
import hospitals from './hospitals';
import hospitalForm from './hospital_form';
import hospitalModalForm from './hospital_modal_form';
import hospitalWindow from './hospital_window';
import hospitalFormContainer from './hospital_container';
import hospitalDepartments from './hospital_departments';
import hospitalStudents from './hospital_students';
import hospitalSearch from './hospital_search';

const hospitalReducer = combineReducers({
  hospitalForm,
  hospitalModalForm,
  hospitalWindow,
  hospitalFormContainer,
  hospitalDepartments,
  hospitalStudents,
  hospitals,
  hospitalSearch,
});

export default hospitalReducer;
