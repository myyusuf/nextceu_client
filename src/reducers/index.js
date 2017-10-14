import { combineReducers } from 'redux';
import studentReducers from './student/';
import hospitalReducers from './hospital/';
import seminarReducers from './seminar/';
import assistanceReducers from './assistance/';
import uploadReducers from './upload/';
import userReducers from './user/';
import settingsReducers from './settings/';
import departmentReducers from './department/';
import menuReducers from './menu/';
import loginReducers from './login/';
import reportReducers from './report/';
import docentReducers from './docent/';
import pengampuReducers from './pengampu/';
import tutorReducers from './tutor/';
import supervisorReducers from './supervisor/';
import yudisiumReducers from './yudisium/';
import ukmppdReducers from './ukmppd/';
import bakordikReducers from './bakordik/';
import workspaceReducers from './workspace/';

const rootReducer = combineReducers({
  studentReducers,
  hospitalReducers,
  assistanceReducers,
  seminarReducers,
  uploadReducers,
  userReducers,
  settingsReducers,
  departmentReducers,
  menuReducers,
  loginReducers,
  reportReducers,
  docentReducers,
  pengampuReducers,
  tutorReducers,
  supervisorReducers,
  yudisiumReducers,
  ukmppdReducers,
  bakordikReducers,
  workspaceReducers,
});

export default rootReducer;
