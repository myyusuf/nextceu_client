import { combineReducers } from 'redux';

import scores from './scores';
import scoreForm from './score_form';
import scoreWindow from './score_window';
import scoreSearch from './score_search';

const userReducer = combineReducers({
  scores,
  scoreForm,
  scoreWindow,
  scoreSearch,
});

export default userReducer;
