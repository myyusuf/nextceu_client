import { combineReducers } from 'redux';
import supervisors from './supervisors';
import supervisorForm from './supervisor_form';
import supervisorWindow from './supervisor_window';
import supervisorSearch from './supervisor_search';

import supervisorsForSelect from './supervisors_for_select';

const supervisorReducer = combineReducers({
  supervisors,
  supervisorForm,
  supervisorWindow,
  supervisorSearch,
  supervisorsForSelect,
});

export default supervisorReducer;
