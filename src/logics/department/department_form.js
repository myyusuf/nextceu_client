import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../utils/validation';

import Constant from '../../Constant';

const DEPARTMENTS_URL = `${Constant.serverUrl}/api/departments`;

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

const departmentFormChangedLogic = createLogic({
  type: 'DEPARTMENT_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_DEPARTMENT_FORM', payload: result });
    done();
  },
});

const saveDepartmentFormLogic = createLogic({
  type: 'SAVE_DEPARTMENT_FORM',
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
    departmentForm.level = 1;

    dispatch({ type: 'SHOW_DEPARTMENT_WINDOW_CONFIRM_LOADING' });

    if (departmentForm.id) {
      axios.put(`${DEPARTMENTS_URL}/${departmentForm.id}`, departmentForm)
        .then((departments) => {
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_DEPARTMENT_FORM_SUCCESS', payload: departments });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_DEPARTMENT_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(DEPARTMENTS_URL, departmentForm)
        .then((departments) => {
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_DEPARTMENT_FORM_SUCCESS', payload: departments });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_DEPARTMENT_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveDepartmentFormSuccessLogic = createLogic({
  type: 'SAVE_DEPARTMENT_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_DEPARTMENT_WINDOW' });
    dispatch({ type: 'FETCH_DEPARTMENTS' });
    notification.success({
      message: 'Save Department Success',
      description: 'Success saving department',
    });
    done();
  },
});

const saveDepartmentFormFailedLogic = createLogic({
  type: 'SAVE_DEPARTMENT_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_DEPARTMENT_WINDOW' });
    notification.error({
      message: 'Add Department Error',
      description: 'Error creating new department',
    });
    done();
  },
});

const loadDepartmentFormLogic = createLogic({
  type: 'LOAD_DEPARTMENT_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const department = action.payload;
    const departmentForm = {
      id: {
        value: department.id,
      },
      code: {
        value: department.code,
      },
      name: {
        value: department.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(departmentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = departmentForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'ADD_DEPARTMENT_LOGIC' });
    dispatch({ type: 'LOAD_DEPARTMENT', payload: validationResult });
    done();
  },
});

export default [
  departmentFormChangedLogic,
  saveDepartmentFormLogic,
  saveDepartmentFormSuccessLogic,
  saveDepartmentFormFailedLogic,
  loadDepartmentFormLogic,
];
