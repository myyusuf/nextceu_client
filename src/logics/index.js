import studentLogics from './student/';
import hospitalLogics from './hospital/';
import seminarLogics from './seminar/';
import userLogics from './user/';

export default [
  ...studentLogics,
  ...hospitalLogics,
  ...seminarLogics,
  ...userLogics,
];
