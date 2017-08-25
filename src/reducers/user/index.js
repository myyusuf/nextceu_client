import { combineReducers } from 'redux';
import users from './users';
import userForm from './user_form';
import userWindow from './user_window';

const userReducer = combineReducers({
  users,
  userForm,
  userWindow,
});

export default userReducer;
