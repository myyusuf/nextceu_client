import { combineReducers } from 'redux';
import hospitals from './hospitals';
import hospitalForm from './hospital_form';
import hospitalModalForm from './hospital_modal_form';
import hospitalWindow from './hospital_window';
import hospitalFormContainer from './hospital_container';
import hospitalDepartments from './hospital_departments';
import hospitalStudents from './hospital_students';
import hospitalSearch from './hospital_search';
import hospitalDepartmentForm from './hospital_department_form';
import hospitalDepartmentWindow from './hospital_department_window';
import hospitalDepartmentSearch from './hospital_department_search';
import hospitalStudentSearch from './hospital_student_search';
import hospitalDepartmentSelection from './hospital_department_selection';

const hospitalReducer = combineReducers({
  hospitalForm,
  hospitalModalForm,
  hospitalWindow,
  hospitalFormContainer,
  hospitalStudents,
  hospitals,
  hospitalSearch,
  hospitalDepartments,
  hospitalDepartmentForm,
  hospitalDepartmentWindow,
  hospitalDepartmentSearch,
  hospitalStudentSearch,
  hospitalDepartmentSelection,
});

export default hospitalReducer;
