import studentLogics from './student/';
import hospitalLogics from './hospital/';
import seminarLogics from './seminar/';
import userLogics from './user/';
import departmentLogics from './department/';
import menuLogics from './menu/';
import loginLogics from './login/';

export default [
  ...studentLogics,
  ...hospitalLogics,
  ...seminarLogics,
  ...userLogics,
  ...departmentLogics,
  ...menuLogics,
  ...loginLogics,
];
