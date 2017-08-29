import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateExist } from '../../utils/validation';

const HOSPITAL_DEPARTMENTS_URL = `${Constant.serverUrl}/api/roles`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'quota':
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchRolesLogic = createLogic({
  type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_HOSPITAL_DEPARTMENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().userReducers.roleSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'HOSPITAL_DEPARTMENT_LOADING_START' });
    axios.get(HOSPITAL_DEPARTMENTS_URL, paramameters)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'HOSPITAL_DEPARTMENT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HOSPITAL_DEPARTMENT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch roles error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllRolesLogic = createLogic({
  type: 'FETCH_ALL_HOSPITAL_DEPARTMENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_HOSPITAL_DEPARTMENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(HOSPITAL_DEPARTMENTS_URL)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch roles error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editRoleLogic = createLogic({
  type: 'EDIT_HOSPITAL_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_DEPARTMENT_FORM' });
    dispatch({ type: 'SHOW_HOSPITAL_DEPARTMENT_WINDOW' });
    done();
  },
});

const cancelAddRoleLogic = createLogic({
  type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_DEPARTMENT_FORM' });
    dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW' });
    done();
  },
});

const saveRoleLogic = createLogic({
  type: 'SAVE_HOSPITAL_DEPARTMENT_LOGIC',
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
      reject({ type: 'SHOW_HOSPITAL_DEPARTMENT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const roleForm = _.mapValues({ ...getState().userReducers.roleForm }, 'value');
    dispatch({ type: 'SHOW_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });

    if (roleForm.id) {
      axios.put(`${HOSPITAL_DEPARTMENTS_URL}/${roleForm.id}`, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC' });
          dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });
          notification.success({
            message: 'Update role success',
            description: 'Success saving role',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Role code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update role error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(HOSPITAL_DEPARTMENTS_URL, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC' });
          dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });
          notification.success({
            message: 'Create role success',
            description: 'Success saving role',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Role code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create role error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteRoleLogic = createLogic({
  type: 'DELETE_HOSPITAL_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${HOSPITAL_DEPARTMENTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete role success',
          description: 'Success deleting role',
        });
        dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });
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
  fetchAllRolesLogic,
];
