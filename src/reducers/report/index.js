import { combineReducers } from 'redux';
import reports from './reports';
import costUnitSearch from './cost_unit_search';
import completedCourses from './student/completed_courses';
import completedCourseSearch from './student/completed_course_search';

const reportReducer = combineReducers({
  reports,
  costUnitSearch,
  completedCourses,
  completedCourseSearch,
});

export default reportReducer;
