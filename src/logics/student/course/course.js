import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { validateLength, validateArrayNotEmpty } from '../../../utils/validation';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;
const COURSES_URL = `${Constant.serverUrl}/api/courses`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    case 'planDate':
      result = validateArrayNotEmpty(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchCoursesLogic = createLogic({
  type: 'FETCH_COURSES_LOGIC',
  cancelType: 'CANCEL_FETCH_COURSES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${STUDENTS_URL}/${action.payload.id}/courses`)
      .then(resp => resp.data)
      .then(courses => dispatch({ type: 'FETCH_COURSES_SUCCESS', payload: courses }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'FETCH_COURSES_FAILED', payload: err, error: true });
        notification.error({
          message: 'Fetch courses error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchCourseLogic = createLogic({
  type: 'FETCH_COURSE_LOGIC',
  cancelType: 'CANCEL_FETCH_COURSE_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${STUDENTS_URL}/${getState().studentReducers.student.id}/courses/${action.payload.courseId}`)
      .then(resp => resp.data)
      .then(course => dispatch({ type: 'FETCH_COURSE_SUCCESS', payload: course }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'FETCH_COURSE_FAILED', payload: err, error: true });
        notification.error({
          message: 'Fetch course error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const saveCourseLogic = createLogic({
  type: 'SAVE_COURSE_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const courseForm = {
      ...getState().studentReducers.courseForm,
    };
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
    const courseForm = _.mapValues({
      ...getState().studentReducers.courseForm,
      ...getState().studentReducers.scoreForm,
    }, 'value');
    dispatch({ type: 'SHOW_COURSE_WINDOW_CONFIRM_LOADING' });

    const student = getState().studentReducers.student;

    axios.put(`${COURSES_URL}/${courseForm.id}`, courseForm)
      .then(() => {
        dispatch({ type: 'HIDE_COURSE_WINDOW_CONFIRM_LOADING' });
        dispatch({ type: 'CANCEL_EDIT_COURSE_LOGIC' });
        dispatch({ type: 'FETCH_COURSES_LOGIC', payload: student });
        notification.success({
          message: 'Update course success',
          description: 'Success saving course',
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HIDE_COURSE_WINDOW_CONFIRM_LOADING' });
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Error on server.';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        notification.error({
          message: 'Update course error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

const editCourseLogic = createLogic({
  type: 'EDIT_COURSE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_COURSE_FORM' });
    dispatch({ type: 'CLEAR_SCORE_FORM' });
    dispatch({ type: 'SHOW_COURSE_WINDOW', payload: action.payload });
    done();
  },
});

const cancelAddCourseLogic = createLogic({
  type: 'CANCEL_EDIT_COURSE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_COURSE_FORM' });
    dispatch({ type: 'CLEAR_SCORE_FORM' });
    dispatch({ type: 'HIDE_COURSE_WINDOW' });
    done();
  },
});

const deleteCourseLogic = createLogic({
  type: 'DELETE_COURSE_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${COURSES_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete course success',
          description: 'Success deleting role',
        });

        dispatch({
          type: 'CANCEL_EDIT_COURSE_LOGIC',
        });

        dispatch({
          type: 'FETCH_COURSES_LOGIC',
          payload: getState().studentReducers.student,
        });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete course error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCoursesLogic,
  fetchCourseLogic,
  saveCourseLogic,
  editCourseLogic,
  cancelAddCourseLogic,
  deleteCourseLogic,
];
