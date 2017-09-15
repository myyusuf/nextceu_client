import { combineReducers } from 'redux';
import trees from './trees';
import initiateStudents from './initiate_students';
import initiateStudentSearch from './initiate_student_search';
import initiateStudentSelection from './initiate_student_selection';

const bakordikReducer = combineReducers({
  trees,
  initiateStudents,
  initiateStudentSearch,
  initiateStudentSelection,
});

export default bakordikReducer;
