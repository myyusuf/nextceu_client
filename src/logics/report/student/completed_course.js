import { createLogic } from 'redux-logic';
import axios from 'axios';
// import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
// import { validateExist, validateLength, validateEmail } from '../../../utils/validation';

const COMPLETED_COURSE_REPORTS_URL = `${Constant.serverUrl}/api/reports/completedcourses`;

const fetchCompletedCoursesLogic = createLogic({
  type: 'FETCH_COMPLETED_COURSES_LOGIC',
  cancelType: 'CANCEL_FETCH_COMPLETED_COURSES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.completedCourseSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'COMPLETED_COURSE_LOADING_START' });
    axios.get(COMPLETED_COURSE_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'COMPLETED_COURSE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_COMPLETED_COURSES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'COMPLETED_COURSE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch completed courses error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCompletedCoursesLogic,
];
