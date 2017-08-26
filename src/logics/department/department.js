import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateExist, validateLength } from '../../utils/validation';

const DEPARTMENTS_URL = `${Constant.serverUrl}/api/departments`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'level':
    case 'duration':
      result = validateExist(key, value);
      break;
    case 'color':
      result = validateLength(key, value, 7);
      break;
    default:
      break;
  }

  return result;
};

const fetchDepartmentLogic = createLogic({
  type: 'FETCH_DEPARTMENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_DEPARTMENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().departmentReducers.departmentSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'DEPARTMENT_LOADING_START' });
    axios.get(DEPARTMENTS_URL, paramameters)
      .then(resp => resp.data)
      .then((departments) => {
        dispatch({ type: 'DEPARTMENT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_DEPARTMENTS_SUCCESS', payload: departments });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'DEPARTMENT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch departments error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllDepartmentLogic = createLogic({
  type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_DEPARTMENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(DEPARTMENTS_URL)
      .then(resp => resp.data)
      .then((departments) => {
        dispatch({ type: 'FETCH_DEPARTMENTS_SUCCESS', payload: departments });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch departments error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editRoleLogic = createLogic({
  type: 'EDIT_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DEPARTMENT_FORM' });
    dispatch({ type: 'SHOW_DEPARTMENT_WINDOW' });
    done();
  },
});

const cancelAddRoleLogic = createLogic({
  type: 'CANCEL_EDIT_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DEPARTMENT_FORM' });
    dispatch({ type: 'HIDE_DEPARTMENT_WINDOW' });
    done();
  },
});

const saveRoleLogic = createLogic({
  type: 'SAVE_DEPARTMENT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const departmentForm = { ...getState().departmentReducers.departmentForm };
    const validationResult = {};
    const keys = _.keys(departmentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = departmentForm[key].value;
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
      reject({ type: 'SHOW_DEPARTMENT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const departmentForm = _.mapValues({ ...getState().departmentReducers.departmentForm }, 'value');
    dispatch({ type: 'SHOW_DEPARTMENT_WINDOW_CONFIRM_LOADING' });

    if (departmentForm.id) {
      axios.put(`${DEPARTMENTS_URL}/${departmentForm.id}`, departmentForm)
        .then(() => {
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_DEPARTMENT_LOGIC' });
          dispatch({ type: 'FETCH_DEPARTMENTS_LOGIC' });
          notification.success({
            message: 'Update department success',
            description: 'Success saving department',
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
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update department error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(DEPARTMENTS_URL, departmentForm)
        .then(() => {
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_DEPARTMENT_LOGIC' });
          dispatch({ type: 'FETCH_DEPARTMENTS_LOGIC' });
          notification.success({
            message: 'Create department success',
            description: 'Success saving department',
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
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create department error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteRoleLogic = createLogic({
  type: 'DELETE_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${DEPARTMENTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete department success',
          description: 'Success deleting department',
        });
        dispatch({ type: 'FETCH_DEPARTMENTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete department error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchDepartmentLogic,
  editRoleLogic,
  cancelAddRoleLogic,
  saveRoleLogic,
  deleteRoleLogic,
  fetchAllDepartmentLogic,
];
