import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../utils/validation';

import Constant from '../../Constant';

const SEMINARS_URL = `${Constant.serverUrl}/api/seminars`;

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

const seminarFormChangedLogic = createLogic({
  type: 'SEMINAR_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SEMINAR_FORM', payload: result });
    done();
  },
});

const saveSeminarFormLogic = createLogic({
  type: 'SAVE_SEMINAR_FORM',
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
    seminarForm.level = 1;

    dispatch({ type: 'SHOW_SEMINAR_WINDOW_CONFIRM_LOADING' });

    if (seminarForm.id) {
      axios.put(`${SEMINARS_URL}/${seminarForm.id}`, seminarForm)
        .then((seminars) => {
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_SEMINAR_FORM_SUCCESS', payload: seminars });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_SEMINAR_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(SEMINARS_URL, seminarForm)
        .then((seminars) => {
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_SEMINAR_FORM_SUCCESS', payload: seminars });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_SEMINAR_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveSeminarFormSuccessLogic = createLogic({
  type: 'SAVE_SEMINAR_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_SEMINAR_WINDOW' });
    dispatch({ type: 'FETCH_SEMINARS' });
    notification.success({
      message: 'Save Seminar Success',
      description: 'Success saving seminar',
    });
    done();
  },
});

const saveSeminarFormFailedLogic = createLogic({
  type: 'SAVE_SEMINAR_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_SEMINAR_WINDOW' });
    notification.error({
      message: 'Add Seminar Error',
      description: 'Error creating new seminar',
    });
    done();
  },
});

const loadSeminarFormLogic = createLogic({
  type: 'LOAD_SEMINAR_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const seminar = action.payload;
    const seminarForm = {
      id: {
        value: seminar.id,
      },
      code: {
        value: seminar.code,
      },
      name: {
        value: seminar.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(seminarForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = seminarForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'ADD_SEMINAR_LOGIC' });
    dispatch({ type: 'LOAD_SEMINAR', payload: validationResult });
    done();
  },
});

export default [
  seminarFormChangedLogic,
  saveSeminarFormLogic,
  saveSeminarFormSuccessLogic,
  saveSeminarFormFailedLogic,
  loadSeminarFormLogic,
];
