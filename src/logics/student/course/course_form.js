import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../../utils/validation';

import Constant from '../../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/courses`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }

  return result;
};

const courseFormChangedLogic = createLogic({
  type: 'COURSE_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_COURSE_FORM', payload: result });
    done();
  },
});

const saveCourseFormLogic = createLogic({
  type: 'SAVE_COURSE_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const courseForm = { ...getState().courseReducers.courseForm };
    const validationResult = {};
    const keys = _.keys(courseForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = courseForm[key].value;
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
      reject({ type: 'SHOW_COURSE_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const courseForm = _.mapValues({ ...getState().courseReducers.courseForm }, 'value');
    courseForm.level = 1;

    dispatch({ type: 'SHOW_COURSE_WINDOW_CONFIRM_LOADING' });

    if (courseForm.id) {
      axios.put(`${STUDENTS_URL}/${courseForm.id}`, courseForm)
        .then((courses) => {
          dispatch({ type: 'HIDE_COURSE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_COURSE_FORM_SUCCESS', payload: courses });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_COURSE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_COURSE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(STUDENTS_URL, courseForm)
        .then((courses) => {
          dispatch({ type: 'HIDE_COURSE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_COURSE_FORM_SUCCESS', payload: courses });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_COURSE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_COURSE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveCourseFormSuccessLogic = createLogic({
  type: 'SAVE_COURSE_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_COURSE_WINDOW' });
    dispatch({ type: 'FETCH_COURSES' });
    notification.success({
      message: 'Save Course Success',
      description: 'Success saving course',
    });
    done();
  },
});

const saveCourseFormFailedLogic = createLogic({
  type: 'SAVE_COURSE_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_COURSE_WINDOW' });
    notification.error({
      message: 'Add Course Error',
      description: 'Error creating new course',
    });
    done();
  },
});

const loadCourseFormLogic = createLogic({
  type: 'LOAD_COURSE_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const course = action.payload;
    const courseForm = {
      id: {
        value: course.id,
      },
      title: {
        value: course.title,
      },
      completion: {
        value: course.completion,
      },
    };
    const validationResult = {};
    const keys = _.keys(courseForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = courseForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'OPEN_COURSE_WINDOW', payload: { title: `${course.title} - ${course.Department.name}` } });
    dispatch({ type: 'LOAD_COURSE', payload: validationResult });
    done();
  },
});

export default [
  courseFormChangedLogic,
  saveCourseFormLogic,
  saveCourseFormSuccessLogic,
  saveCourseFormFailedLogic,
  loadCourseFormLogic,
];
