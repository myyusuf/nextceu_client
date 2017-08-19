import { combineReducers } from 'redux';
import students from './students';
import student from './student';
import studentForm from './student_form';
import studentWindow from './student_window';
import studentFilter from './student_filter';
import courses from './courses';

const studentReducer = combineReducers({
  students,
  student,
  studentForm,
  studentWindow,
  studentFilter,
  courses,
});

export default studentReducer;
