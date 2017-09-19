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
import pengampuLogics from './pengampu/';
import yudisiumLogics from './yudisium/';
import ukmppdLogics from './ukmppd/';
import bakordikLogics from './bakordik/';

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
  ...pengampuLogics,
  ...yudisiumLogics,
  ...ukmppdLogics,
  ...bakordikLogics,
];
