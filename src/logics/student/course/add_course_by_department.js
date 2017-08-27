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
    case 'department':
    case 'startDate':
      result = validateExist(key, value, 3);
      break;
    case 'title':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const editAddCourseByDepartmentLogic = createLogic({
  type: 'EDIT_ADD_COURSE_BY_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_COURSE_BY_DEPARTMENT_FORM' });
    dispatch({ type: 'SHOW_ADD_COURSE_BY_DEPARTMENT_WINDOW' });
    done();
  },
});

const cancelAddAddCourseByDepartmentLogic = createLogic({
  type: 'CANCEL_EDIT_ADD_COURSE_BY_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_COURSE_BY_DEPARTMENT_FORM' });
    dispatch({ type: 'HIDE_ADD_COURSE_BY_DEPARTMENT_WINDOW' });
    done();
  },
});

const saveAddCourseByDepartmentLogic = createLogic({
  type: 'SAVE_ADD_COURSE_BY_DEPARTMENT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const addCourseByDepartmentForm = { ...getState().studentReducers.addCourseByDepartmentForm };
    const validationResult = {};
    const keys = _.keys(addCourseByDepartmentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = addCourseByDepartmentForm[key].value;
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
      reject({ type: 'SHOW_ADD_COURSE_BY_DEPARTMENT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const addCourseByDepartmentForm = _.mapValues({ ...getState().studentReducers.addCourseByDepartmentForm }, 'value');
    addCourseByDepartmentForm.formType = 'DEPARTMENT';
    dispatch({ type: 'SHOW_ADD_COURSE_BY_DEPARTMENT_WINDOW_CONFIRM_LOADING' });

    axios.post(`${STUDENTS_URL}/${getState().studentReducers.student.id}/courses`, addCourseByDepartmentForm)
      .then(() => {
        dispatch({ type: 'HIDE_ADD_COURSE_BY_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
        dispatch({ type: 'CANCEL_EDIT_ADD_COURSE_BY_DEPARTMENT_LOGIC' });
        dispatch({ type: 'FETCH_ADD_COURSE_BY_DEPARTMENTS_LOGIC' });
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
        dispatch({ type: 'HIDE_ADD_COURSE_BY_DEPARTMENT_WINDOW_CONFIRM_LOADING' });
        notification.error({
          message: 'Create courses error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  editAddCourseByDepartmentLogic,
  cancelAddAddCourseByDepartmentLogic,
  saveAddCourseByDepartmentLogic,
];
