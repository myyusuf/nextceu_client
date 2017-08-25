import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../utils/validation';

import Constant from '../../Constant';

const ROLES_URL = `${Constant.serverUrl}/api/roles`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const roleFormChangedLogic = createLogic({
  type: 'ROLE_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_ROLE_FORM', payload: result });
    done();
  },
});

const saveRoleFormLogic = createLogic({
  type: 'SAVE_ROLE_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const roleForm = { ...getState().roleReducers.roleForm };
    const validationResult = {};
    const keys = _.keys(roleForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = roleForm[key].value;
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
      reject({ type: 'SHOW_ROLE_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const roleForm = _.mapValues({ ...getState().roleReducers.roleForm }, 'value');
    roleForm.level = 1;

    dispatch({ type: 'SHOW_ROLE_WINDOW_CONFIRM_LOADING' });

    if (roleForm.id) {
      axios.put(`${ROLES_URL}/${roleForm.id}`, roleForm)
        .then((roles) => {
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_ROLE_FORM_SUCCESS', payload: roles });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_ROLE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(ROLES_URL, roleForm)
        .then((roles) => {
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_ROLE_FORM_SUCCESS', payload: roles });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_ROLE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveRoleFormSuccessLogic = createLogic({
  type: 'SAVE_ROLE_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_ROLE_WINDOW' });
    dispatch({ type: 'FETCH_ROLES' });
    notification.success({
      message: 'Save Role Success',
      description: 'Success saving role',
    });
    done();
  },
});

const saveRoleFormFailedLogic = createLogic({
  type: 'SAVE_ROLE_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_ROLE_WINDOW' });
    notification.error({
      message: 'Add Role Error',
      description: 'Error creating new role',
    });
    done();
  },
});

const loadRoleFormLogic = createLogic({
  type: 'LOAD_ROLE_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const role = action.payload;
    const roleForm = {
      id: {
        value: role.id,
      },
      code: {
        value: role.code,
      },
      name: {
        value: role.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(roleForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = roleForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'ADD_ROLE_LOGIC' });
    dispatch({ type: 'LOAD_ROLE', payload: validationResult });
    done();
  },
});

export default [
  roleFormChangedLogic,
  saveRoleFormLogic,
  saveRoleFormSuccessLogic,
  saveRoleFormFailedLogic,
  loadRoleFormLogic,
];
