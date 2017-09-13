import costUnitLogics from './cost_unit';
import costUnitClinicLogics from './cost_unit_clinic';
import initiateCourseLogics from './student/initiate_course';
import completedCourseLogics from './student/completed_course';
import initiateXptLogics from './student/initiate_xpt';
import initiateXptFormLogics from './student/initiate_xpt_form';
import exportToPreTestLogics from './student/export_to_pre_test';
import exportToPreTestFormLogics from './student/export_to_pre_test_form';

import preTestLogics from './schedule/pre_test';

export default [
  ...costUnitLogics,
  ...costUnitClinicLogics,
  ...initiateCourseLogics,
  ...completedCourseLogics,
  ...exportToPreTestLogics,
  ...exportToPreTestFormLogics,
  ...initiateXptLogics,
  ...initiateXptFormLogics,
  ...preTestLogics,
];
