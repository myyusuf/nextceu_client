import { combineReducers } from 'redux';
import users from './users';
import userForm from './user_form';
import userWindow from './user_window';

import roles from './roles';
import roleForm from './role_form';
import roleWindow from './role_window';

const userReducer = combineReducers({
  users,
  userForm,
  userWindow,
  roles,
  roleForm,
  roleWindow,
});

export default userReducer;
