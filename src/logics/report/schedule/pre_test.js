import { createLogic } from 'redux-logic';
import axios from 'axios';
// import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
// import { validateExist, validateLength, validateEmail } from '../../../utils/validation';

const PRE_TEST_REPORTS_URL = `${Constant.serverUrl}/api/reports/pretests`;

const fetchCompletedCoursesLogic = createLogic({
  type: 'FETCH_PRE_TESTS_LOGIC',
  cancelType: 'CANCEL_FETCH_PRE_TESTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.preTestSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'PRE_TEST_LOADING_START' });
    axios.get(PRE_TEST_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PRE_TEST_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PRE_TESTS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PRE_TEST_LOADING_FINISH' });
        notification.error({
          message: 'Fetch pre test report error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const removeCoursesFromPreTestLogic = createLogic({
  type: 'REMOVE_COURSES_FROM_PRETEST_LOGIC',
  process({ getState, action }, dispatch, done) {
    const exportToPreTestForm = { courseIds: getState().reportReducers.preTestSelection.rowKeys };
    axios.put(`${PRE_TEST_REPORTS_URL}/remove`, exportToPreTestForm)
      .then(() => {
        dispatch({ type: 'FETCH_PRE_TESTS_LOGIC' });
        notification.success({
          message: 'Remove success',
          description: 'Success removing students.',
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
        notification.error({
          message: 'Error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCompletedCoursesLogic,
  removeCoursesFromPreTestLogic,
];
