import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateLength } from '../../utils/validation';

const TUTORS_URL = `${Constant.serverUrl}/api/tutors`;

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

const fetchTutorsLogic = createLogic({
  type: 'FETCH_TUTORS_LOGIC',
  cancelType: 'CANCEL_FETCH_TUTORS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().tutorReducers.tutorSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'TUTOR_LOADING_START' });
    axios.get(TUTORS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'TUTOR_LOADING_FINISH' });
        dispatch({ type: 'FETCH_TUTORS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'TUTOR_LOADING_FINISH' });
        notification.error({
          message: 'Fetch tutors error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchTutorsForSelectLogic = createLogic({
  type: 'FETCH_TUTORS_FOR_SELECT_LOGIC',
  cancelType: 'CANCEL_FETCH_TUTORS_FOR_SELECT_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(TUTORS_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_TUTORS_FOR_SELECT_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch tutors error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editTutorLogic = createLogic({
  type: 'EDIT_TUTOR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_TUTOR_FORM' });
    dispatch({ type: 'SHOW_TUTOR_WINDOW' });
    done();
  },
});

const cancelAddTutorLogic = createLogic({
  type: 'CANCEL_EDIT_TUTOR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_TUTOR_FORM' });
    dispatch({ type: 'HIDE_TUTOR_WINDOW' });
    done();
  },
});

const saveTutorLogic = createLogic({
  type: 'SAVE_TUTOR_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const tutorForm = { ...getState().tutorReducers.tutorForm };
    const validationResult = {};
    const keys = _.keys(tutorForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = tutorForm[key].value;
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
      reject({ type: 'SHOW_TUTOR_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const tutorForm = _.mapValues({ ...getState().tutorReducers.tutorForm }, 'value');
    dispatch({ type: 'SHOW_TUTOR_WINDOW_CONFIRM_LOADING' });

    if (tutorForm.id) {
      axios.put(`${TUTORS_URL}/${tutorForm.id}`, tutorForm)
        .then(() => {
          dispatch({ type: 'HIDE_TUTOR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_TUTOR_LOGIC' });
          dispatch({ type: 'FETCH_TUTORS_LOGIC' });
          notification.success({
            message: 'Update tutor success',
            description: 'Success saving tutor',
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
          dispatch({ type: 'HIDE_TUTOR_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update tutor error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(TUTORS_URL, tutorForm)
        .then(() => {
          dispatch({ type: 'HIDE_TUTOR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_TUTOR_LOGIC' });
          dispatch({ type: 'FETCH_TUTORS_LOGIC' });
          notification.success({
            message: 'Create tutor success',
            description: 'Success saving tutor',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Tutorname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_TUTOR_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create tutor error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteTutorLogic = createLogic({
  type: 'DELETE_TUTOR_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${TUTORS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete tutor success',
          description: 'Success deleting tutor',
        });
        dispatch({ type: 'FETCH_TUTORS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete tutor error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const tutorPageChangedLogic = createLogic({
  type: 'TUTOR_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'TUTOR_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_TUTORS_LOGIC' });
    done();
  },
});

export default [
  fetchTutorsLogic,
  fetchTutorsForSelectLogic,
  editTutorLogic,
  cancelAddTutorLogic,
  saveTutorLogic,
  deleteTutorLogic,
  tutorPageChangedLogic,
];
