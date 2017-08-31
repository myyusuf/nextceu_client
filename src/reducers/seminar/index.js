import { combineReducers } from 'redux';
import seminars from './seminars';
import participants from './participants';
import seminarForm from './seminar_form';
import seminarWindow from './seminar_window';
import seminarSearch from './seminar_search';
import participantSearch from './participant_search';

const seminarReducer = combineReducers({
  seminars,
  participants,
  seminarForm,
  seminarWindow,
  seminarSearch,
  participantSearch,
});

export default seminarReducer;
