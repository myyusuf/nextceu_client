import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateExist, validateLength } from '../../../../utils/validation';

const COURSES_URL = `${Constant.serverUrl}/api/courses`;
const COURSE_PROBLEMS_URL = `${Constant.serverUrl}/api/courseproblems`;
const COURSE_PROBLEM_TYPES_URL = `${Constant.serverUrl}/api/courseproblemtypes`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    case 'description':
      result = validateLength(key, value, 10);
      break;
    case 'courseProblemType':
    case 'problemDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchCourseProblemsLogic = createLogic({
  type: 'FETCH_COURSE_PROBLEMS_LOGIC',
  cancelType: 'CANCEL_FETCH_COURSE_PROBLEMS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    // const search = getState().courseProblemReducers.courseProblemSearch;
    // const paramameters = search ? { params: { ...search } } : {};
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'COURSE_PROBLEM_LOADING_START' });
    axios.get(`${COURSES_URL}/${courseId}/courseproblems`)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'COURSE_PROBLEM_LOADING_FINISH' });
        dispatch({ type: 'FETCH_COURSE_PROBLEMS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'COURSE_PROBLEM_LOADING_FINISH' });
        notification.error({
          message: 'Fetch course problems error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchCourseProblemTypessLogic = createLogic({
  type: 'FETCH_COURSE_PROBLEM_TYPES_LOGIC',
  cancelType: 'CANCEL_FETCH_COURSE_PROBLEM_TYPES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(COURSE_PROBLEM_TYPES_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_COURSE_PROBLEM_TYPES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch course problem types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editCourseProblemLogic = createLogic({
  type: 'EDIT_COURSE_PROBLEM_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_COURSE_PROBLEM_FORM' });
    dispatch({ type: 'SHOW_COURSE_PROBLEM_WINDOW' });
    done();
  },
});

const cancelEditCourseProblemLogic = createLogic({
  type: 'CANCEL_EDIT_COURSE_PROBLEM_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_COURSE_PROBLEM_FORM' });
    dispatch({ type: 'HIDE_COURSE_PROBLEM_WINDOW' });
    done();
  },
});

const saveCourseProblemLogic = createLogic({
  type: 'SAVE_COURSE_PROBLEM_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const courseProblemForm = { ...getState().studentReducers.courseProblemForm };
    const validationResult = {};
    const keys = _.keys(courseProblemForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = courseProblemForm[key].value;
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
      reject({ type: 'SHOW_COURSE_PROBLEM_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const courseProblemForm = _.mapValues({ ...getState().studentReducers.courseProblemForm }, 'value');
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'SHOW_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING' });

    if (courseProblemForm.id) {
      axios.put(`${COURSE_PROBLEMS_URL}/${courseProblemForm.id}`, courseProblemForm)
        .then(() => {
          dispatch({ type: 'HIDE_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_COURSE_PROBLEM_LOGIC' });
          dispatch({ type: 'FETCH_COURSE_PROBLEMS_LOGIC' });
          notification.success({
            message: 'Update course problem success',
            description: 'Success saving course problem',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Error';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update course problem error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(`${COURSES_URL}/${courseId}/courseproblems`, courseProblemForm)
        .then(() => {
          dispatch({ type: 'HIDE_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_COURSE_PROBLEM_LOGIC' });
          dispatch({ type: 'FETCH_COURSE_PROBLEMS_LOGIC' });
          notification.success({
            message: 'Create course problem success',
            description: 'Success saving course problem',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Error';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create course problem error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteCourseProblemLogic = createLogic({
  type: 'DELETE_COURSE_PROBLEM_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${COURSE_PROBLEMS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete course problem success',
          description: 'Success deleting course problem',
        });
        dispatch({ type: 'FETCH_COURSE_PROBLEMS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete course problem error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const courseProblemPageChangedLogic = createLogic({
  type: 'COURSE_PROBLEM_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'COURSE_PROBLEM_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_COURSE_PROBLEMS_LOGIC' });
    done();
  },
});

export default [
  fetchCourseProblemsLogic,
  editCourseProblemLogic,
  cancelEditCourseProblemLogic,
  saveCourseProblemLogic,
  deleteCourseProblemLogic,
  courseProblemPageChangedLogic,
  fetchCourseProblemTypessLogic,
];
