import { combineReducers } from 'redux';
import students from './students';
import studentForm from './student_form';
import studentWindow from './student_window';
import studentSearch from './student_search';

import student from './student';

import courses from './course/courses';
import courseForm from './course/course_form';
import courseWindow from './course/course_window';
import scheduleForm from './course/schedule_form';
import scoreForm from './course/score_form';
import seminars from './course/seminars';

import addCourseByLevelForm from './course/add_course_by_level_form';
import addCourseByLevelWindow from './course/add_course_by_level_window';

import addCourseByDepartmentForm from './course/add_course_by_department_form';
import addCourseByDepartmentWindow from './course/add_course_by_department_window';

const studentReducer = combineReducers({
  students,
  student,
  studentForm,
  studentWindow,
  studentSearch,
  courses,
  courseForm,
  courseWindow,
  scheduleForm,
  scoreForm,
  seminars,
  addCourseByLevelForm,
  addCourseByLevelWindow,
  addCourseByDepartmentForm,
  addCourseByDepartmentWindow,
});

export default studentReducer;
