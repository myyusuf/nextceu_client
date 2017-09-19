import { combineReducers } from 'redux';
import yscForm from './ysc_form';
import yudisiumWindow from './yudisium_window';

const yudisiumReducer = combineReducers({
  yscForm,
  yudisiumWindow,
});

export default yudisiumReducer;
