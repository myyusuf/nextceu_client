import { combineReducers } from 'redux';
import docents from './docents';
import docentForm from './docent_form';
import docentWindow from './docent_window';
import docentSearch from './docent_search';

import docentsByHD from './docents_by_hd';
import docentsByCD from './docents_by_cd';

const docentReducer = combineReducers({
  docents,
  docentForm,
  docentWindow,
  docentSearch,
  docentsByHD,
  docentsByCD,
});

export default docentReducer;
