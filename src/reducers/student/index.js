import { combineReducers } from 'redux';
import students from './students';
import student from './student';
import studentForm from './student_form';
import studentWindow from './student_window';
import studentFilter from './student_filter';
import courses from './course/courses';
import courseForm from './course/course_form';
import courseWindow from './course/course_window';
import scheduleForm from './course/schedule_form';
import scoreForm from './course/score_form';
import seminars from './course/seminars';

const studentReducer = combineReducers({
  students,
  student,
  studentForm,
  studentWindow,
  studentFilter,
  courses,
  courseForm,
  courseWindow,
  scheduleForm,
  scoreForm,
  seminars,
});

export default studentReducer;
