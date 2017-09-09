import { combineReducers } from 'redux';
import settings from './settings';

import appProps from './app_props';
import appPropForm from './app_prop_form';
import appPropWindow from './app_prop_window';
import appPropSearch from './app_prop_search';

const settingsReducer = combineReducers({
  settings,
  appProps,
  appPropForm,
  appPropWindow,
  appPropSearch,
});

export default settingsReducer;
