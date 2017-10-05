import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateExist, validateLength } from '../../utils/validation';

const PENGAMPUS_URL = `${Constant.serverUrl}/api/pengampus`;
const PENGAMPUS_BY_DEPARTMENT_URL = `${Constant.serverUrl}/api/pengampusbydepartment`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchPengampusLogic = createLogic({
  type: 'FETCH_PENGAMPUS_LOGIC',
  cancelType: 'CANCEL_FETCH_PENGAMPUS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().pengampuReducers.pengampuSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'PENGAMPU_LOADING_START' });
    axios.get(PENGAMPUS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PENGAMPU_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PENGAMPUS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PENGAMPU_LOADING_FINISH' });
        notification.error({
          message: 'Fetch pengampus error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllPengampusByHDLogic = createLogic({
  type: 'FETCH_PENGAMPUS_BY_DEPARTMENT_LOGIC',
  cancelType: 'CANCEL_FETCH_PENGAMPUS_BY_DEPARTMENT_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const hospitalId = getState().studentReducers.courseForm.hospital1.value ?
    getState().studentReducers.courseForm.hospital1.value.id : null;
    const paramameters = { params: {
      hospital: hospitalId,
      department: getState().studentReducers.courseForm.tempDepartment.value,
      r: mathRandom(),
    } };
    axios.get(PENGAMPUS_BY_DEPARTMENT_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_PENGAMPUS_BY_DEPARTMENT_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch pengampus error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editPengampuLogic = createLogic({
  type: 'EDIT_PENGAMPU_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PENGAMPU_FORM' });
    dispatch({ type: 'SHOW_PENGAMPU_WINDOW' });
    done();
  },
});

const cancelAddPengampuLogic = createLogic({
  type: 'CANCEL_EDIT_PENGAMPU_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PENGAMPU_FORM' });
    dispatch({ type: 'HIDE_PENGAMPU_WINDOW' });
    done();
  },
});

const savePengampuLogic = createLogic({
  type: 'SAVE_PENGAMPU_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const pengampuForm = { ...getState().pengampuReducers.pengampuForm };
    const validationResult = {};
    const keys = _.keys(pengampuForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = pengampuForm[key].value;
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
      reject({ type: 'SHOW_PENGAMPU_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const pengampuForm = _.mapValues({ ...getState().pengampuReducers.pengampuForm }, 'value');
    dispatch({ type: 'SHOW_PENGAMPU_WINDOW_CONFIRM_LOADING' });

    if (pengampuForm.id) {
      axios.put(`${PENGAMPUS_URL}/${pengampuForm.id}`, pengampuForm)
        .then(() => {
          dispatch({ type: 'HIDE_PENGAMPU_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PENGAMPU_LOGIC' });
          dispatch({ type: 'FETCH_PENGAMPUS_LOGIC' });
          notification.success({
            message: 'Update pengampu success',
            description: 'Success saving pengampu',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_PENGAMPU_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update pengampu error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(PENGAMPUS_URL, pengampuForm)
        .then(() => {
          dispatch({ type: 'HIDE_PENGAMPU_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PENGAMPU_LOGIC' });
          dispatch({ type: 'FETCH_PENGAMPUS_LOGIC' });
          notification.success({
            message: 'Create pengampu success',
            description: 'Success saving pengampu',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Pengampuname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_PENGAMPU_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create pengampu error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deletePengampuLogic = createLogic({
  type: 'DELETE_PENGAMPU_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${PENGAMPUS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete pengampu success',
          description: 'Success deleting pengampu',
        });
        dispatch({ type: 'FETCH_PENGAMPUS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete pengampu error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const pengampuPageChangedLogic = createLogic({
  type: 'PENGAMPU_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'PENGAMPU_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_PENGAMPUS_LOGIC' });
    done();
  },
});

export default [
  fetchPengampusLogic,
  fetchAllPengampusByHDLogic,
  editPengampuLogic,
  cancelAddPengampuLogic,
  savePengampuLogic,
  deletePengampuLogic,
  pengampuPageChangedLogic,
];
