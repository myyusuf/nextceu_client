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
// import scoreForm from './course/score_form';
import courseSeminars from './course/course_seminars';

import addCourseByLevelForm from './course/add_course_by_level_form';
import addCourseByLevelWindow from './course/add_course_by_level_window';

import addCourseByDepartmentForm from './course/add_course_by_department_form';
import addCourseByDepartmentWindow from './course/add_course_by_department_window';

import courseChartWindow from './course/course_chart_window';

import hospitalSchedules from './course/hospital_schedules';
import hospitalScheduleSearch from './course/hospital_schedule_search';
import hospitalScheduleWindow from './course/hospital_schedule_window';

import hospitalScheduleSelection from './course/hospital_schedule_selection';

import scores from './course/score/scores';
import scoreForm from './course/score/score_form';
import scoreWindow from './course/score/score_window';
import scoreSearch from './course/score/score_search';
import scoreTypes from './course/score/score_types';

import cpts from './course/cpt/cpts';
import cptForm from './course/cpt/cpt_form';
import cptWindow from './course/cpt/cpt_window';
import cptSearch from './course/cpt/cpt_search';

import courseProblems from './course/course_problem/course_problems';
import courseProblemForm from './course/course_problem/course_problem_form';
import courseProblemWindow from './course/course_problem/course_problem_window';
import courseProblemSearch from './course/course_problem/course_problem_search';

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
  courseSeminars,
  addCourseByLevelForm,
  addCourseByLevelWindow,
  addCourseByDepartmentForm,
  addCourseByDepartmentWindow,
  courseChartWindow,
  hospitalSchedules,
  hospitalScheduleSearch,
  hospitalScheduleWindow,
  hospitalScheduleSelection,
  scores,
  scoreForm,
  scoreWindow,
  scoreSearch,
  scoreTypes,
  cpts,
  cptForm,
  cptWindow,
  cptSearch,
  courseProblems,
  courseProblemForm,
  courseProblemWindow,
  courseProblemSearch,
});

export default studentReducer;
