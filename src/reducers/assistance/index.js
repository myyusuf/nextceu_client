import { combineReducers } from 'redux';
import assistances from './assistances';
import participants from './participants';
import assistanceForm from './assistance_form';
import assistanceWindow from './assistance_window';
import assistanceSearch from './assistance_search';
import participantSearch from './participant_search';
import assistanceSelection from './assistance_selection';

const assistanceReducer = combineReducers({
  assistances,
  participants,
  assistanceForm,
  assistanceWindow,
  assistanceSearch,
  participantSearch,
  assistanceSelection,
});

export default assistanceReducer;
