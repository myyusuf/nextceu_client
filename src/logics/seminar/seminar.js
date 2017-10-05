import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateExist, validateLength } from '../../utils/validation';

const SEMINARS_URL = `${Constant.serverUrl}/api/seminars`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'eventDate':
    case 'eventTime':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchSeminarsLogic = createLogic({
  type: 'FETCH_SEMINARS_LOGIC',
  cancelType: 'CANCEL_FETCH_SEMINARS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().seminarReducers.seminarSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'SEMINAR_LOADING_START' });
    axios.get(SEMINARS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'SEMINAR_LOADING_FINISH' });
        dispatch({ type: 'FETCH_SEMINARS_SUCCESS', payload: data });

        dispatch({ type: 'CLEAR_SEMINAR_SELECT' });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SEMINAR_LOADING_FINISH' });
        notification.error({
          message: 'Fetch seminars error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editSeminarLogic = createLogic({
  type: 'EDIT_SEMINAR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SEMINAR_FORM' });
    dispatch({ type: 'SHOW_SEMINAR_WINDOW' });
    done();
  },
});

const cancelAddSeminarLogic = createLogic({
  type: 'CANCEL_EDIT_SEMINAR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SEMINAR_FORM' });
    dispatch({ type: 'HIDE_SEMINAR_WINDOW' });
    done();
  },
});

const saveSeminarLogic = createLogic({
  type: 'SAVE_SEMINAR_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const seminarForm = { ...getState().seminarReducers.seminarForm };
    const validationResult = {};
    const keys = _.keys(seminarForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = seminarForm[key].value;
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
      reject({ type: 'SHOW_SEMINAR_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const seminarForm = _.mapValues({ ...getState().seminarReducers.seminarForm }, 'value');
    dispatch({ type: 'SHOW_SEMINAR_WINDOW_CONFIRM_LOADING' });

    if (seminarForm.id) {
      axios.put(`${SEMINARS_URL}/${seminarForm.id}`, seminarForm)
        .then(() => {
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SEMINAR_LOGIC' });
          dispatch({ type: 'FETCH_SEMINARS_LOGIC' });
          notification.success({
            message: 'Update seminar success',
            description: 'Success saving seminar',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Seminarname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update seminar error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(SEMINARS_URL, seminarForm)
        .then(() => {
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SEMINAR_LOGIC' });
          dispatch({ type: 'FETCH_SEMINARS_LOGIC' });
          notification.success({
            message: 'Create seminar success',
            description: 'Success saving seminar',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Seminarname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create seminar error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteSeminarLogic = createLogic({
  type: 'DELETE_SEMINAR_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${SEMINARS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete seminar success',
          description: 'Success deleting seminar',
        });
        dispatch({ type: 'FETCH_SEMINARS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete seminar error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const seminarPageChangedLogic = createLogic({
  type: 'SEMINAR_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SEMINAR_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_SEMINARS_LOGIC' });
    done();
  },
});

export default [
  fetchSeminarsLogic,
  editSeminarLogic,
  cancelAddSeminarLogic,
  saveSeminarLogic,
  deleteSeminarLogic,
  seminarPageChangedLogic,
];
