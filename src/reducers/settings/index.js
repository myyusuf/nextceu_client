import { combineReducers } from 'redux';
import settings from './settings';

import appProps from './app_props';
import appPropForm from './app_prop_form';
import appPropWindow from './app_prop_window';
import appPropSearch from './app_prop_search';

import hospitalUsers from './hospital_users';
import hospitalUserForm from './hospital_user_form';
import hospitalUserWindow from './hospital_user_window';
import hospitalUserSearch from './hospital_user_search';

const settingsReducer = combineReducers({
  settings,
  appProps,
  appPropForm,
  appPropWindow,
  appPropSearch,
  hospitalUsers,
  hospitalUserForm,
  hospitalUserWindow,
  hospitalUserSearch,
});

export default settingsReducer;
