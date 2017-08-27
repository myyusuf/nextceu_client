import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

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

export default [
  fetchCoursesLogic,
  fetchCourseLogic,
];
