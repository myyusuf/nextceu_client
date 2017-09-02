import { combineReducers } from 'redux';

import loginForm from './login_form';
import loginFormContainer from './login_form_container';

const loginReducer = combineReducers({
  loginForm,
  loginFormContainer,
});

export default loginReducer;
