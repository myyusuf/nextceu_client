import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateLength, validateExist } from '../../../../utils/validation';

const SGTS_URL = `${Constant.serverUrl}/api/sgltypes`;
const SGTS_BY_DEPARTMENT_URL = `${Constant.serverUrl}/api/sgltypesbydepartment`;

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

const fetchSgtsLogic = createLogic({
  type: 'FETCH_SGTS_LOGIC',
  cancelType: 'CANCEL_FETCH_SGTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().studentReducers.sgtSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'SGT_LOADING_START' });
    axios.get(SGTS_URL, paramameters)
      .then(resp => resp.data)
      .then((sgts) => {
        dispatch({ type: 'SGT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_SGTS_SUCCESS', payload: sgts });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SGT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch sgts error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchSgtsByDepartmentLogic = createLogic({
  type: 'FETCH_SGTS_BY_DEPARTMENT_LOGIC',
  cancelType: 'CANCEL_FETCH_SGTS_BY_DEPARTMENT_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const paramameters = { params: {
      department: getState().studentReducers.courseForm.tempDepartment.value,
    } };
    axios.get(SGTS_BY_DEPARTMENT_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_SGTS_BY_DEPARTMENT_SUCCESS', payload: data });
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

const fetchAllSgtsLogic = createLogic({
  type: 'FETCH_ALL_SGTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_SGTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(SGTS_URL)
      .then(resp => resp.data)
      .then((sgts) => {
        dispatch({ type: 'FETCH_SGTS_SUCCESS', payload: sgts });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch sgts error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editSgtLogic = createLogic({
  type: 'EDIT_SGT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SGT_FORM' });
    dispatch({ type: 'SHOW_SGT_WINDOW' });
    done();
  },
});

const cancelAddSgtLogic = createLogic({
  type: 'CANCEL_EDIT_SGT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SGT_FORM' });
    dispatch({ type: 'HIDE_SGT_WINDOW' });
    done();
  },
});

const saveSgtLogic = createLogic({
  type: 'SAVE_SGT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const sgtForm = { ...getState().studentReducers.sgtForm };
    const validationResult = {};
    const keys = _.keys(sgtForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = sgtForm[key].value;
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
      reject({ type: 'SHOW_SGT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const sgtForm = _.mapValues({ ...getState().studentReducers.sgtForm }, 'value');
    dispatch({ type: 'SHOW_SGT_WINDOW_CONFIRM_LOADING' });

    if (sgtForm.id) {
      axios.put(`${SGTS_URL}/${sgtForm.id}`, sgtForm)
        .then(() => {
          dispatch({ type: 'HIDE_SGT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SGT_LOGIC' });
          dispatch({ type: 'FETCH_SGTS_LOGIC' });
          notification.success({
            message: 'Update sgt success',
            description: 'Success saving sgt',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Sgt code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SGT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update sgt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(SGTS_URL, sgtForm)
        .then(() => {
          dispatch({ type: 'HIDE_SGT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SGT_LOGIC' });
          dispatch({ type: 'FETCH_SGTS_LOGIC' });
          notification.success({
            message: 'Create sgt success',
            description: 'Success saving sgt',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Sgt code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SGT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create sgt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteSgtLogic = createLogic({
  type: 'DELETE_SGT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${SGTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete sgt success',
          description: 'Success deleting sgt',
        });
        dispatch({ type: 'FETCH_SGTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete sgt error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchSgtsLogic,
  fetchSgtsByDepartmentLogic,
  editSgtLogic,
  cancelAddSgtLogic,
  saveSgtLogic,
  deleteSgtLogic,
  fetchAllSgtsLogic,
];
