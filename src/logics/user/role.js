import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateLength } from '../../utils/validation';

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

const fetchRolesLogic = createLogic({
  type: 'FETCH_ROLES_LOGIC',
  cancelType: 'CANCEL_FETCH_ROLES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().userReducers.roleSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'ROLE_LOADING_START' });
    axios.get(ROLES_URL, paramameters)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'ROLE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_ROLES_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'ROLE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch roles error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editRoleLogic = createLogic({
  type: 'EDIT_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'SHOW_ROLE_WINDOW' });
    done();
  },
});

const cancelAddRoleLogic = createLogic({
  type: 'CANCEL_EDIT_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'HIDE_ROLE_WINDOW' });
    done();
  },
});

const saveRoleLogic = createLogic({
  type: 'SAVE_ROLE_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const roleForm = { ...getState().userReducers.roleForm };
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
    const roleForm = _.mapValues({ ...getState().userReducers.roleForm }, 'value');
    dispatch({ type: 'SHOW_ROLE_WINDOW_CONFIRM_LOADING' });

    if (roleForm.id) {
      axios.put(`${ROLES_URL}/${roleForm.id}`, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_ROLE_LOGIC' });
          dispatch({ type: 'FETCH_ROLES_LOGIC' });
          notification.success({
            message: 'Update role success',
            description: 'Success saving role',
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update role error',
            description: 'Please check internet connection.',
          });
        })
        .then(() => done());
    } else {
      axios.post(ROLES_URL, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_ROLE_LOGIC' });
          dispatch({ type: 'FETCH_ROLES_LOGIC' });
          notification.success({
            message: 'Create role success',
            description: 'Success saving role',
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_ROLE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create role error',
            description: 'Please check internet connection.',
          });
        })
        .then(() => done());
    }
  },
});

const deleteRoleLogic = createLogic({
  type: 'DELETE_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${ROLES_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete role success',
          description: 'Success deleting role',
        });
        dispatch({ type: 'FETCH_ROLES_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete role error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchRolesLogic,
  editRoleLogic,
  cancelAddRoleLogic,
  saveRoleLogic,
  deleteRoleLogic,
];
