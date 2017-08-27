import studentLogics from './student';
import studentFormLogics from './student_form';
import courseLogics from './course/course';
import courseFormLogics from './course/course_form';
import courseWindowLogics from './course/course_window';
import scheduleFormLogics from './course/schedule_form';
import scoreFormLogics from './course/score_form';

import addCourseByLevelFormLogics from './course/add_course_by_level_form';
import addCourseByLevelLogics from './course/add_course_by_level';

import addCourseByDepartmentFormLogics from './course/add_course_by_department_form';
import addCourseByDepartmentLogics from './course/add_course_by_department';

export default [
  ...studentLogics,
  ...studentFormLogics,
  ...courseLogics,
  ...courseFormLogics,
  ...courseWindowLogics,
  ...scheduleFormLogics,
  ...scoreFormLogics,
  ...addCourseByLevelFormLogics,
  ...addCourseByLevelLogics,
  ...addCourseByDepartmentFormLogics,
  ...addCourseByDepartmentLogics,
];
