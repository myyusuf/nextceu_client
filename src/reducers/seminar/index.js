import { combineReducers } from 'redux';
import seminars from './seminars';
import participants from './participants';
import seminarForm from './seminar_form';
import seminarWindow from './seminar_window';

const seminarReducer = combineReducers({
  seminars,
  participants,
  seminarForm,
  seminarWindow,
});

export default seminarReducer;
