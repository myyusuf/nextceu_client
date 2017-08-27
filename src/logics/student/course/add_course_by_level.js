import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { validateLength, validateExist } from '../../../utils/validation';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'level':
    case 'startDate':
      result = validateExist(key, value, 3);
      break;
    case 'suffix':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const editAddCourseByLevelLogic = createLogic({
  type: 'EDIT_ADD_COURSE_BY_LEVEL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_COURSE_BY_LEVEL_FORM' });
    dispatch({ type: 'SHOW_ADD_COURSE_BY_LEVEL_WINDOW' });
    done();
  },
});

const cancelAddAddCourseByLevelLogic = createLogic({
  type: 'CANCEL_EDIT_ADD_COURSE_BY_LEVEL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_COURSE_BY_LEVEL_FORM' });
    dispatch({ type: 'HIDE_ADD_COURSE_BY_LEVEL_WINDOW' });
    done();
  },
});

const saveAddCourseByLevelLogic = createLogic({
  type: 'SAVE_ADD_COURSE_BY_LEVEL_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const addCourseByLevelForm = { ...getState().studentReducers.addCourseByLevelForm };
    const validationResult = {};
    const keys = _.keys(addCourseByLevelForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = addCourseByLevelForm[key].value;
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
      reject({ type: 'SHOW_ADD_COURSE_BY_LEVEL_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const addCourseByLevelForm = _.mapValues({ ...getState().studentReducers.addCourseByLevelForm }, 'value');
    dispatch({ type: 'SHOW_ADD_COURSE_BY_LEVEL_WINDOW_CONFIRM_LOADING' });

    axios.post(`${STUDENTS_URL}/${getState().studentReducers.student.id}/courses`, addCourseByLevelForm)
      .then(() => {
        dispatch({ type: 'HIDE_ADD_COURSE_BY_LEVEL_WINDOW_CONFIRM_LOADING' });
        dispatch({ type: 'CANCEL_EDIT_ADD_COURSE_BY_LEVEL_LOGIC' });
        dispatch({ type: 'FETCH_ADD_COURSE_BY_LEVELS_LOGIC' });
        notification.success({
          message: 'Create courses success',
          description: 'Success saving courses',
        });
      })
      .catch((err) => {
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Unkown error';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        dispatch({ type: 'HIDE_ADD_COURSE_BY_LEVEL_WINDOW_CONFIRM_LOADING' });
        notification.error({
          message: 'Create courses error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  editAddCourseByLevelLogic,
  cancelAddAddCourseByLevelLogic,
  saveAddCourseByLevelLogic,
];
