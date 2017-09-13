import { combineReducers } from 'redux';
import reports from './reports';
import costUnits from './cost_units';
import costUnitSearch from './cost_unit_search';
import costUnitsClinic from './cost_units_clinic';
import costUnitSearchClinic from './cost_unit_search_clinic';
import initiateCourses from './student/initiate_courses';
import initiateCourseSearch from './student/initiate_course_search';
import initiateCourseSelection from './student/initiate_course_selection';
import initiateXptForm from './student/initiate_xpt_form';
import initiateXptWindow from './student/initiate_xpt_window';
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
  costUnits,
  costUnitSearch,
  costUnitsClinic,
  costUnitSearchClinic,
  initiateCourses,
  initiateCourseSearch,
  initiateCourseSelection,
  initiateXptForm,
  initiateXptWindow,
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
