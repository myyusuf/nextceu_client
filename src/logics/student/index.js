import studentLogics from './student';
import studentFormLogics from './student_form';
import courseLogics from './course/course';
import courseFormLogics from './course/course_form';
import courseWindowLogics from './course/course_window';
import scheduleFormLogics from './course/schedule_form';
import scoreFormLogics from './course/score_form';

export default [
  ...studentLogics,
  ...studentFormLogics,
  ...courseLogics,
  ...courseFormLogics,
  ...courseWindowLogics,
  ...scheduleFormLogics,
  ...scoreFormLogics,
];
