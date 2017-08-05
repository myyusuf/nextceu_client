import { combineReducers } from 'redux';
import students from './students';
import student from './student';
import studentForm from './student_form';
import studentWindow from './student_window';
import courses from './courses';

const rootReducer = combineReducers({
  students,
  student,
  studentForm,
  studentWindow,
  courses,
});

export default rootReducer;
