import studentLogics from './student/';
import hospitalLogics from './hospital/';
import seminarLogics from './seminar/';

export default [
  ...studentLogics,
  ...hospitalLogics,
  ...seminarLogics,
];
