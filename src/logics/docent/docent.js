import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateExist, validateLength } from '../../utils/validation';

const DOCENTS_URL = `${Constant.serverUrl}/api/docents`;
const DOCENTS_BY_HD_URL = `${Constant.serverUrl}/api/docentsbyhd`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'hospital':
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchDocentsLogic = createLogic({
  type: 'FETCH_DOCENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_DOCENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().docentReducers.docentSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'DOCENT_LOADING_START' });
    axios.get(DOCENTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'DOCENT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_DOCENTS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'DOCENT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch docents error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllDocentsByHDLogic = createLogic({
  type: 'FETCH_DOCENTS_BY_HD_LOGIC',
  cancelType: 'CANCEL_FETCH_DOCENTS_BY_HD_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const hospitalId = getState().studentReducers.courseForm.hospital1.value ?
    getState().studentReducers.courseForm.hospital1.value.id : null;
    const paramameters = { params: {
      hospital: hospitalId,
      department: getState().studentReducers.courseForm.tempDepartment.value,
    } };
    axios.get(DOCENTS_BY_HD_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_DOCENTS_BY_HD_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch docents error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchAllDocentsByCDLogic = createLogic({
  type: 'FETCH_DOCENTS_BY_CD_LOGIC',
  cancelType: 'CANCEL_FETCH_DOCENTS_BY_CD_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const hospitalId = getState().studentReducers.courseForm.clinic.value ?
    getState().studentReducers.courseForm.clinic.value.id : null;
    const paramameters = { params: {
      hospital: hospitalId,
      department: getState().studentReducers.courseForm.tempDepartment.value,
    } };
    axios.get(DOCENTS_BY_HD_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_DOCENTS_BY_CD_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch docents error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editDocentLogic = createLogic({
  type: 'EDIT_DOCENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DOCENT_FORM' });
    dispatch({ type: 'SHOW_DOCENT_WINDOW' });
    done();
  },
});

const cancelAddDocentLogic = createLogic({
  type: 'CANCEL_EDIT_DOCENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DOCENT_FORM' });
    dispatch({ type: 'HIDE_DOCENT_WINDOW' });
    done();
  },
});

const saveDocentLogic = createLogic({
  type: 'SAVE_DOCENT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const docentForm = { ...getState().docentReducers.docentForm };
    const validationResult = {};
    const keys = _.keys(docentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = docentForm[key].value;
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
      reject({ type: 'SHOW_DOCENT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const docentForm = _.mapValues({ ...getState().docentReducers.docentForm }, 'value');
    dispatch({ type: 'SHOW_DOCENT_WINDOW_CONFIRM_LOADING' });

    if (docentForm.id) {
      axios.put(`${DOCENTS_URL}/${docentForm.id}`, docentForm)
        .then(() => {
          dispatch({ type: 'HIDE_DOCENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_DOCENT_LOGIC' });
          dispatch({ type: 'FETCH_DOCENTS_LOGIC' });
          notification.success({
            message: 'Update docent success',
            description: 'Success saving docent',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Docentname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_DOCENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update docent error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(DOCENTS_URL, docentForm)
        .then(() => {
          dispatch({ type: 'HIDE_DOCENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_DOCENT_LOGIC' });
          dispatch({ type: 'FETCH_DOCENTS_LOGIC' });
          notification.success({
            message: 'Create docent success',
            description: 'Success saving docent',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Docentname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_DOCENT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create docent error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteDocentLogic = createLogic({
  type: 'DELETE_DOCENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${DOCENTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete docent success',
          description: 'Success deleting docent',
        });
        dispatch({ type: 'FETCH_DOCENTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete docent error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const docentPageChangedLogic = createLogic({
  type: 'DOCENT_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'DOCENT_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_DOCENTS_LOGIC' });
    done();
  },
});

export default [
  fetchDocentsLogic,
  fetchAllDocentsByHDLogic,
  fetchAllDocentsByCDLogic,
  editDocentLogic,
  cancelAddDocentLogic,
  saveDocentLogic,
  deleteDocentLogic,
  docentPageChangedLogic,
];
