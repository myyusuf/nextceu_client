import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { mathRandom } from '../../../utils/random';
import { validateLength, validateExist } from '../../../utils/validation';

const SMTS_URL = `${Constant.serverUrl}/api/seminartypes`;
const SMTS_BY_DEPARTMENT_URL = `${Constant.serverUrl}/api/smltypesbydepartment`;

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

const fetchSmtsLogic = createLogic({
  type: 'FETCH_SMTS_LOGIC',
  cancelType: 'CANCEL_FETCH_SMTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().seminarReducers.smtSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'SMT_LOADING_START' });
    axios.get(SMTS_URL, paramameters)
      .then(resp => resp.data)
      .then((smts) => {
        dispatch({ type: 'SMT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_SMTS_SUCCESS', payload: smts });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SMT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch smts error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchSmtsByDepartmentLogic = createLogic({
  type: 'FETCH_SMTS_BY_DEPARTMENT_LOGIC',
  cancelType: 'CANCEL_FETCH_SMTS_BY_DEPARTMENT_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const paramameters = { params: {
      department: getState().seminarReducers.courseForm.tempDepartment.value,
      r: mathRandom(),
    } };
    axios.get(SMTS_BY_DEPARTMENT_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_SMTS_BY_DEPARTMENT_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch pengampu error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchAllSmtsLogic = createLogic({
  type: 'FETCH_ALL_SMTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_SMTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(SMTS_URL, { params: { r: mathRandom() } })
      .then(resp => resp.data)
      .then((smts) => {
        dispatch({ type: 'FETCH_SMTS_SUCCESS', payload: smts });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch smts error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editSmtLogic = createLogic({
  type: 'EDIT_SMT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SMT_FORM' });
    dispatch({ type: 'SHOW_SMT_WINDOW' });
    done();
  },
});

const cancelAddSmtLogic = createLogic({
  type: 'CANCEL_EDIT_SMT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SMT_FORM' });
    dispatch({ type: 'HIDE_SMT_WINDOW' });
    done();
  },
});

const saveSmtLogic = createLogic({
  type: 'SAVE_SMT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const smtForm = { ...getState().seminarReducers.smtForm };
    const validationResult = {};
    const keys = _.keys(smtForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = smtForm[key].value;
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
      reject({ type: 'SHOW_SMT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const smtForm = _.mapValues({ ...getState().seminarReducers.smtForm }, 'value');
    dispatch({ type: 'SHOW_SMT_WINDOW_CONFIRM_LOADING' });

    if (smtForm.id) {
      axios.put(`${SMTS_URL}/${smtForm.id}`, smtForm)
        .then(() => {
          dispatch({ type: 'HIDE_SMT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SMT_LOGIC' });
          dispatch({ type: 'FETCH_SMTS_LOGIC' });
          notification.success({
            message: 'Update smt success',
            description: 'Success saving smt',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Smt code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SMT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update smt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(SMTS_URL, smtForm)
        .then(() => {
          dispatch({ type: 'HIDE_SMT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SMT_LOGIC' });
          dispatch({ type: 'FETCH_SMTS_LOGIC' });
          notification.success({
            message: 'Create smt success',
            description: 'Success saving smt',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Smt code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SMT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create smt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteSmtLogic = createLogic({
  type: 'DELETE_SMT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${SMTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete smt success',
          description: 'Success deleting smt',
        });
        dispatch({ type: 'FETCH_SMTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete smt error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchSmtsLogic,
  fetchSmtsByDepartmentLogic,
  editSmtLogic,
  cancelAddSmtLogic,
  saveSmtLogic,
  deleteSmtLogic,
  fetchAllSmtsLogic,
];
