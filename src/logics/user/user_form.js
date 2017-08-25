import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../utils/validation';

import Constant from '../../Constant';

const USERS_URL = `${Constant.serverUrl}/api/users`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'username':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const userFormChangedLogic = createLogic({
  type: 'USER_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_USER_FORM', payload: result });
    done();
  },
});

const saveUserFormLogic = createLogic({
  type: 'SAVE_USER_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const userForm = { ...getState().userReducers.userForm };
    const validationResult = {};
    const keys = _.keys(userForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = userForm[key].value;
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
      reject({ type: 'SHOW_USER_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const userForm = _.mapValues({ ...getState().userReducers.userForm }, 'value');
    userForm.level = 1;

    dispatch({ type: 'SHOW_USER_WINDOW_CONFIRM_LOADING' });

    if (userForm.id) {
      axios.put(`${USERS_URL}/${userForm.id}`, userForm)
        .then((users) => {
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_USER_FORM_SUCCESS', payload: users });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_USER_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(USERS_URL, userForm)
        .then((users) => {
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_USER_FORM_SUCCESS', payload: users });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_USER_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveUserFormSuccessLogic = createLogic({
  type: 'SAVE_USER_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_USER_WINDOW' });
    dispatch({ type: 'FETCH_USERS' });
    notification.success({
      message: 'Save User Success',
      description: 'Success saving user',
    });
    done();
  },
});

const saveUserFormFailedLogic = createLogic({
  type: 'SAVE_USER_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_USER_WINDOW' });
    notification.error({
      message: 'Add User Error',
      description: 'Error creating new user',
    });
    done();
  },
});

const loadUserFormLogic = createLogic({
  type: 'LOAD_USER_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const user = action.payload;
    const userForm = {
      id: {
        value: user.id,
      },
      username: {
        value: user.username,
      },
      name: {
        value: user.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(userForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = userForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'ADD_USER_LOGIC' });
    dispatch({ type: 'LOAD_USER', payload: validationResult });
    done();
  },
});

export default [
  userFormChangedLogic,
  saveUserFormLogic,
  saveUserFormSuccessLogic,
  saveUserFormFailedLogic,
  loadUserFormLogic,
];
