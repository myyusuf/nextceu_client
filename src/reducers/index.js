import { combineReducers } from 'redux';
import studentReducers from './student/';
import hospitalReducers from './hospital/';
import seminarReducers from './seminar/';
import uploadReducers from './upload/';
import userReducers from './user/';
import settingsReducers from './settings/';
import departmentReducers from './department/';
import menuReducers from './menu/';
import loginReducers from './login/';
import reportReducers from './report/';
import docentReducers from './docent/';
import pengampuReducers from './pengampu/';
import ukmppdReducers from './ukmppd/';
import bakordikReducers from './bakordik/';

const rootReducer = combineReducers({
  studentReducers,
  hospitalReducers,
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
  ukmppdReducers,
  bakordikReducers,
});

export default rootReducer;
