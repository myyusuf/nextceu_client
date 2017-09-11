import { combineReducers } from 'redux';
import upts from './upt/upts';
import uptForm from './upt/upt_form';
import uptWindow from './upt/upt_window';
import uptSearch from './upt/upt_search';

import kompres from './kompres';
import kompreForm from './kompre_form';
import kompreWindow from './kompre_window';
import kompreSearch from './kompre_search';

const userReducer = combineReducers({
  upts,
  uptForm,
  uptWindow,
  uptSearch,
  kompres,
  kompreForm,
  kompreWindow,
  kompreSearch,
});

export default userReducer;
