import studentLogics from './student';
import studentFormLogics from './student_form';
import studentWindowLogics from './student_window';
import courseLogics from './course';

export default [
  ...studentLogics,
  ...studentFormLogics,
  ...studentWindowLogics,
  ...courseLogics,
];
