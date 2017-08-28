import studentLogics from './student';
import studentFormLogics from './student_form';
import courseLogics from './course/course';
import courseFormLogics from './course/course_form';
import scheduleFormLogics from './course/schedule_form';
import scoreFormLogics from './course/score_form';

import addCourseByLevelFormLogics from './course/add_course_by_level_form';
import addCourseByLevelLogics from './course/add_course_by_level';

import addCourseByDepartmentFormLogics from './course/add_course_by_department_form';
import addCourseByDepartmentLogics from './course/add_course_by_department';

import hospitalScheduleLogics from './course/hospital_schedule';

export default [
  ...studentLogics,
  ...studentFormLogics,
  ...courseLogics,
  ...courseFormLogics,
  ...scheduleFormLogics,
  ...scoreFormLogics,
  ...addCourseByLevelFormLogics,
  ...addCourseByLevelLogics,
  ...addCourseByDepartmentFormLogics,
  ...addCourseByDepartmentLogics,
  ...hospitalScheduleLogics,
];
