import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateExist } from '../../utils/validation';

const SIGNIN_URL = `${Constant.serverUrl}/api/security/signin`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'username':
    case 'password':
      result = validateExist(key, value, 3);
      break;
    default:
      break;
  }

  return result;
};


const doLoginLogic = createLogic({
  type: 'DO_LOGIN_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const loginForm = { ...getState().loginReducers.loginForm };
    const validationResult = {};
    const keys = _.keys(loginForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = loginForm[key].value;
        validationResult[key] = {
          value,
          ...validate(key, value),
        };

        if (validationResult[key].validateStatus && validationResult[key].validateStatus === 'error') {
          isFormValid = false;
        }
      }
    }

    if (isFormValid) {
      allow(action);
    } else {
      reject({ type: 'SHOW_LOGIN_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const loginForm = _.mapValues({ ...getState().loginReducers.loginForm }, 'value');
    dispatch({ type: 'SHOW_LOGIN_FORM_CONTAINER_CONFIRM_LOADING' });

    axios.post(SIGNIN_URL, loginForm)
      .then((response) => {
        dispatch({ type: 'HIDE_LOGIN_FORM_CONTAINER_CONFIRM_LOADING' });
        const token = response.data.token;
        if (typeof (Storage) !== 'undefined') {
          window.sessionStorage.setItem('token', token);
          window.location.href = '/';
        } else {
            alert('Sorry! No Web Storage support..');
        }
      })
      .catch((err) => {
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Ex. wrong username or password';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        dispatch({ type: 'HIDE_LOGIN_FORM_CONTAINER_CONFIRM_LOADING' });
        notification.error({
          message: 'Wrong username or password',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  doLoginLogic,
];
