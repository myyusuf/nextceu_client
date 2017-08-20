import { createLogic } from 'redux-logic';
import axios from 'axios';

import Constant from '../../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const FETCH_COURSES = 'FETCH_COURSES';
const CANCEL_FETCH_COURSES = 'CANCEL_FETCH_COURSES';
const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
const FETCH_COURSES_FAILED = 'FETCH_COURSES_FAILED';

const fetchCoursesLogic = createLogic({
  type: FETCH_COURSES, // only apply this logic to this type
  cancelType: CANCEL_FETCH_COURSES, // cancel on this type
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${STUDENTS_URL}/${action.studentId}/courses`)
      .then(resp => resp.data)
      .then(courses => dispatch({ type: FETCH_COURSES_SUCCESS, payload: courses }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: FETCH_COURSES_FAILED, payload: err, error: true });
      })
      .then(() => done());
  },
});

const fetchCourseLogic = createLogic({
  type: 'FETCH_COURSE',
  cancelType: 'CANCEL_FETCH_COURSE',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${STUDENTS_URL}/${action.payload.studentId}/courses/${action.payload.courseId}`)
      .then(resp => resp.data)
      .then(course => dispatch({ type: 'FETCH_COURSE_SUCCESS', payload: course }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'FETCH_COURSE_FAILED', payload: err, error: true });
      })
      .then(() => done());
  },
});

export default [
  fetchCoursesLogic,
  fetchCourseLogic,
];
