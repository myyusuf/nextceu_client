import { combineReducers } from 'redux';
import students from './students';
import student from './student';
import studentForm from './student_form';
import courses from './courses';

const rootReducer = combineReducers({
  students,
  student,
  studentForm,
  courses,
});

export default rootReducer;
