import { combineReducers } from 'redux';
import tutors from './tutors';
import tutorForm from './tutor_form';
import tutorWindow from './tutor_window';
import tutorSearch from './tutor_search';

import tutorsForSelect from './tutors_for_select';

const tutorReducer = combineReducers({
  tutors,
  tutorForm,
  tutorWindow,
  tutorSearch,
  tutorsForSelect,
});

export default tutorReducer;
