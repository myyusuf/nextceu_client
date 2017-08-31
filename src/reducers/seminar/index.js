import { combineReducers } from 'redux';
import seminars from './seminars';
import participants from './participants';
import seminarForm from './seminar_form';
import seminarWindow from './seminar_window';
import seminarSearch from './seminar_search';
import participantSearch from './participant_search';
import seminarSelection from './seminar_selection';

const seminarReducer = combineReducers({
  seminars,
  participants,
  seminarForm,
  seminarWindow,
  seminarSearch,
  participantSearch,
  seminarSelection,
});

export default seminarReducer;
