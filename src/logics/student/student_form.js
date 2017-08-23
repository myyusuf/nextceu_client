import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength, validateEmail } from '../../utils/validation';

import Constant from '../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'oldSid':
    case 'newSid':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'email':
      result = validateEmail(key, value);
      break;
    default:
      break;
  }

  return result;
};

const studentFormChangedLogic = createLogic({
  type: 'STUDENT_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_STUDENT_FORM', payload: result });
    done();
  },
});

const saveStudentFormLogic = createLogic({
  type: 'SAVE_STUDENT_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const studentForm = { ...getState().studentReducers.studentForm };
    const validationResult = {};
    const keys = _.keys(studentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = studentForm[key].value;
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
      reject({ type: 'SHOW_USER_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const studentForm = _.mapValues({ ...getState().studentReducers.studentForm }, 'value');
    studentForm.level = 1;

    dispatch({ type: 'SHOW_STUDENT_WINDOW_CONFIRM_LOADING' });

    if (studentForm.id) {
      axios.put(`${STUDENTS_URL}/${studentForm.id}`, studentForm)
        .then((students) => {
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_STUDENT_FORM_SUCCESS', payload: students });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_STUDENT_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(STUDENTS_URL, studentForm)
        .then((students) => {
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_STUDENT_FORM_SUCCESS', payload: students });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_STUDENT_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveStudentFormSuccessLogic = createLogic({
  type: 'SAVE_STUDENT_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_ADD_STUDENT_WINDOW' });
    dispatch({ type: 'FETCH_STUDENTS' });
    notification.success({
      message: 'Save Student Success',
      description: 'Success saving student',
    });
    done();
  },
});

const saveStudentFormFailedLogic = createLogic({
  type: 'SAVE_STUDENT_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_ADD_STUDENT_WINDOW' });
    notification.error({
      message: 'Add Student Error',
      description: 'Error creating new student',
    });
    done();
  },
});

const loadStudentFormLogic = createLogic({
  type: 'LOAD_STUDENT_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const student = action.payload;
    const studentForm = {
      id: {
        value: student.id,
      },
      oldSid: {
        value: student.oldSid,
      },
      newSid: {
        value: student.newSid,
      },
      name: {
        value: student.name,
      },
      level: {
        value: student.level,
      },
      email: {
        value: student.email,
      },
    };
    const validationResult = {};
    const keys = _.keys(studentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = studentForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'OPEN_ADD_STUDENT_WINDOW' });
    dispatch({ type: 'LOAD_STUDENT', payload: validationResult });
    done();
  },
});

export default [
  studentFormChangedLogic,
  saveStudentFormLogic,
  saveStudentFormSuccessLogic,
  saveStudentFormFailedLogic,
  loadStudentFormLogic,
];