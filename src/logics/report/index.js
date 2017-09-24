import costUnitLogics from './cost_unit';
import costUnitClinicLogics from './cost_unit_clinic';
import initiateCourseLogics from './student/initiate_course';
import completedCourseLogics from './student/completed_course';
import levelCourseLogics from './student/level_course';
import assistanceCourseLogics from './student/assistance_course';
import initiateXptLogics from './student/initiate_xpt';
import initiateXptFormLogics from './student/initiate_xpt_form';
import exportToPreTestLogics from './student/export_to_pre_test';
import exportToPreTestFormLogics from './student/export_to_pre_test_form';
import levelXptLogics from './student/level_xpt';
import levelXptFormLogics from './student/level_xpt_form';
import assistanceXptLogics from './student/assistance_xpt';
import assistanceXptFormLogics from './student/assistance_xpt_form';

import preTestLogics from './schedule/pre_test';

export default [
  ...costUnitLogics,
  ...costUnitClinicLogics,
  ...initiateCourseLogics,
  ...completedCourseLogics,
  ...levelCourseLogics,
  ...assistanceCourseLogics,
  ...exportToPreTestLogics,
  ...exportToPreTestFormLogics,
  ...initiateXptLogics,
  ...initiateXptFormLogics,
  ...preTestLogics,
  ...levelXptLogics,
  ...levelXptFormLogics,
  ...assistanceXptLogics,
  ...assistanceXptFormLogics,
];
