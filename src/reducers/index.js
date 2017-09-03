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
});

export default rootReducer;
