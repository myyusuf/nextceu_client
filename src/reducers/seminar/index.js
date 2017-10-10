import { combineReducers } from 'redux';
import seminars from './seminars';
import participants from './participants';
import seminarForm from './seminar_form';
import seminarWindow from './seminar_window';
import seminarSearch from './seminar_search';
import participantSearch from './participant_search';
import seminarSelection from './seminar_selection';

import smts from './smt/smts';
import smtsByDepartment from './smt/smts_by_department';
import smtForm from './smt/smt_form';
import smtWindow from './smt/smt_window';
import smtSearch from './smt/smt_search';

const seminarReducer = combineReducers({
  seminars,
  participants,
  seminarForm,
  seminarWindow,
  seminarSearch,
  participantSearch,
  seminarSelection,
  smts,
  smtsByDepartment,
  smtForm,
  smtWindow,
  smtSearch,
});

export default seminarReducer;
