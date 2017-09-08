import studentReportLogics from './student/completed_course';
import exportToPreTestLogics from './student/export_to_pre_test';
import exportToPreTestFormLogics from './student/export_to_pre_test_form';

export default [
  ...studentReportLogics,
  ...exportToPreTestLogics,
  ...exportToPreTestFormLogics,
];
