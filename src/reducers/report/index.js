import { combineReducers } from 'redux';
import reports from './reports';
import costUnitSearch from './cost_unit_search';
import completedCourses from './student/completed_courses';
import completedCourseSearch from './student/completed_course_search';
import completedCourseSelection from './student/completed_course_selection';
import exportToPreTestForm from './student/export_to_pre_test_form';
import exportToPreTestWindow from './student/export_to_pre_test_window';

import preTests from './schedule/pre_tests';
import preTestSearch from './schedule/pre_test_search';
import preTestSelection from './schedule/pre_test_selection';

const reportReducer = combineReducers({
  reports,
  costUnitSearch,
  completedCourses,
  completedCourseSearch,
  completedCourseSelection,
  exportToPreTestForm,
  exportToPreTestWindow,
  preTests,
  preTestSearch,
  preTestSelection,
});

export default reportReducer;
