import { combineReducers } from 'redux';
import yscForm from './ysc_form';
import yudisiumWindow from './yudisium_window';
import portofolioCompletion from './portofolio_completion';

const yudisiumReducer = combineReducers({
  yscForm,
  yudisiumWindow,
  portofolioCompletion,
});

export default yudisiumReducer;
