import studentLogics from './student';
import studentWindowLogics from './student_window';
import courseLogics from './course';

export default [
  ...studentLogics,
  ...studentWindowLogics,
  ...courseLogics,
];
