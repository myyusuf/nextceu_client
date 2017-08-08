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
  process({ getState, action }, dispatch, done) {
    const studentForm = _.mapValues({ ...getState().studentReducers.studentForm }, 'value');
    studentForm.level = 1;
    axios.post(STUDENTS_URL, studentForm)
      .then(students => dispatch({ type: 'SAVE_STUDENT_FORM_SUCCESS', payload: students }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SAVE_STUDENT_FORM_FAILED', payload: err, error: true });
      })
      .then(() => done());
  },
});

const saveStudentFormSuccessLogic = createLogic({
  type: 'SAVE_STUDENT_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_ADD_STUDENT_WINDOW' });
    dispatch({ type: 'FETCH_STUDENTS' });
    notification.success({
      message: 'Add Student Success',
      description: 'Success creating new student',
    });
    done();
  },
});

export default [
  studentFormChangedLogic,
  saveStudentFormLogic,
  saveStudentFormSuccessLogic,
];
