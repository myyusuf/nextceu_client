import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import { validateExist, validateLength } from '../../utils/validation';

const ASSISTANCES_URL = `${Constant.serverUrl}/api/assistances`;
const STUDENT_ASSISTANCES_URL = `${Constant.serverUrl}/api/assistanceparticipants`;

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

const fetchAssistancesLogic = createLogic({
  type: 'FETCH_ASSISTANCES_LOGIC',
  cancelType: 'CANCEL_FETCH_ASSISTANCES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().assistanceReducers.assistanceSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'ASSISTANCE_LOADING_START' });
    axios.get(ASSISTANCES_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'ASSISTANCE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_ASSISTANCES_SUCCESS', payload: data });

        dispatch({ type: 'CLEAR_ASSISTANCE_SELECT' });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'ASSISTANCE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch assistances error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchStudentAssistancesLogic = createLogic({
  type: 'FETCH_STUDENT_ASSISTANCES_LOGIC',
  cancelType: 'CANCEL_FETCH_STUDENT_ASSISTANCES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const studentId = getState().studentReducers.student.id;
    dispatch({ type: 'STUDENT_ASSISTANCE_LOADING_START' });
    axios.get(`${STUDENT_ASSISTANCES_URL}/bystudent/${studentId}`, { params: { r: mathRandom() } })
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'STUDENT_ASSISTANCE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_STUDENT_ASSISTANCES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'STUDENT_ASSISTANCE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch assistances error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editAssistanceLogic = createLogic({
  type: 'EDIT_ASSISTANCE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ASSISTANCE_FORM' });
    dispatch({ type: 'SHOW_ASSISTANCE_WINDOW' });
    done();
  },
});

const cancelAddAssistanceLogic = createLogic({
  type: 'CANCEL_EDIT_ASSISTANCE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ASSISTANCE_FORM' });
    dispatch({ type: 'HIDE_ASSISTANCE_WINDOW' });
    done();
  },
});

const saveAssistanceLogic = createLogic({
  type: 'SAVE_ASSISTANCE_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const assistanceForm = { ...getState().assistanceReducers.assistanceForm };
    const validationResult = {};
    const keys = _.keys(assistanceForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = assistanceForm[key].value;
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
      reject({ type: 'SHOW_ASSISTANCE_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const assistanceForm = _.mapValues({ ...getState().assistanceReducers.assistanceForm }, 'value');
    dispatch({ type: 'SHOW_ASSISTANCE_WINDOW_CONFIRM_LOADING' });

    if (assistanceForm.id) {
      axios.put(`${ASSISTANCES_URL}/${assistanceForm.id}`, assistanceForm)
        .then(() => {
          dispatch({ type: 'HIDE_ASSISTANCE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_ASSISTANCE_LOGIC' });
          dispatch({ type: 'FETCH_ASSISTANCES_LOGIC' });
          notification.success({
            message: 'Update assistance success',
            description: 'Success saving assistance',
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
          dispatch({ type: 'HIDE_ASSISTANCE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update assistance error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(ASSISTANCES_URL, assistanceForm)
        .then(() => {
          dispatch({ type: 'HIDE_ASSISTANCE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_ASSISTANCE_LOGIC' });
          dispatch({ type: 'FETCH_ASSISTANCES_LOGIC' });
          notification.success({
            message: 'Create assistance success',
            description: 'Success saving assistance',
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
          dispatch({ type: 'HIDE_ASSISTANCE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create assistance error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteAssistanceLogic = createLogic({
  type: 'DELETE_ASSISTANCE_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${ASSISTANCES_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete assistance success',
          description: 'Success deleting assistance',
        });
        dispatch({ type: 'FETCH_ASSISTANCES_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete assistance error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const assistancePageChangedLogic = createLogic({
  type: 'ASSISTANCE_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'ASSISTANCE_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_ASSISTANCES_LOGIC' });
    done();
  },
});

export default [
  fetchAssistancesLogic,
  fetchStudentAssistancesLogic,
  editAssistanceLogic,
  cancelAddAssistanceLogic,
  saveAssistanceLogic,
  deleteAssistanceLogic,
  assistancePageChangedLogic,
];
