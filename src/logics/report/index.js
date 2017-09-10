import costUnitLogics from './cost_unit';
import costUnitClinicLogics from './cost_unit_clinic';
import completedCourseLogics from './student/completed_course';
import exportToPreTestLogics from './student/export_to_pre_test';
import exportToPreTestFormLogics from './student/export_to_pre_test_form';

import preTestLogics from './schedule/pre_test';

export default [
  ...costUnitLogics,
  ...costUnitClinicLogics,
  ...completedCourseLogics,
  ...exportToPreTestLogics,
  ...exportToPreTestFormLogics,
  ...preTestLogics,
];
