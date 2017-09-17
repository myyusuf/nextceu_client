import { combineReducers } from 'redux';
import pengampus from './pengampus';
import pengampuForm from './pengampu_form';
import pengampuWindow from './pengampu_window';
import pengampuSearch from './pengampu_search';

import pengampusByDepartment from './pengampus_by_department';

const pengampuReducer = combineReducers({
  pengampus,
  pengampuForm,
  pengampuWindow,
  pengampuSearch,
  pengampusByDepartment,
});

export default pengampuReducer;
