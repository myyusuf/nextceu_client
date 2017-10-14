import { combineReducers } from 'redux';
import pageTitle from './page_title';

const workspaceReducer = combineReducers({
  pageTitle,
});

export default workspaceReducer;
