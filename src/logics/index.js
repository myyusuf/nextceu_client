import studentLogics from './student/';
import scoreLogics from './score/';
import hospitalLogics from './hospital/';
import seminarLogics from './seminar/';
import userLogics from './user/';
import departmentLogics from './department/';
import menuLogics from './menu/';
import loginLogics from './login/';

export default [
  ...studentLogics,
  ...scoreLogics,
  ...hospitalLogics,
  ...seminarLogics,
  ...userLogics,
  ...departmentLogics,
  ...menuLogics,
  ...loginLogics,
];
