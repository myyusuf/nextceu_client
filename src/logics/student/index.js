import studentLogics from './student';
import studentFormLogics from './student_form';
import studentWindowLogics from './student_window';
import courseLogics from './course/course';
import courseFormLogics from './course/course_form';
import courseWindowLogics from './course/course_window';
import scheduleFormLogics from './course/schedule_form';
import scoreFormLogics from './course/score_form';

export default [
  ...studentLogics,
  ...studentFormLogics,
  ...studentWindowLogics,
  ...courseLogics,
  ...courseFormLogics,
  ...courseWindowLogics,
  ...scheduleFormLogics,
  ...scoreFormLogics,
];
