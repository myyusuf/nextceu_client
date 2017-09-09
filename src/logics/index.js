import settingsLogics from './settings/';
import studentLogics from './student/';
import hospitalLogics from './hospital/';
import seminarLogics from './seminar/';
import userLogics from './user/';
import departmentLogics from './department/';
import menuLogics from './menu/';
import loginLogics from './login/';
import reportLogics from './report/';
import docentLogics from './docent/';

export default [
  ...settingsLogics,
  ...studentLogics,
  ...hospitalLogics,
  ...seminarLogics,
  ...userLogics,
  ...departmentLogics,
  ...menuLogics,
  ...loginLogics,
  ...reportLogics,
  ...docentLogics,
];
