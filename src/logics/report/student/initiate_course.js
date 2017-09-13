import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import * as actions from '../../../actions/ActionType';

const INITIATE_COURSE_REPORTS_URL = `${Constant.serverUrl}/api/reports/initiatecourses`;

const fetchCompletedCoursesLogic = createLogic({
  type: actions.report.student.initiateCourse.fetchCourses,
  cancelType: actions.report.student.initiateCourse.cancelFetchCourses,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.initiateCourseSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'INITIATE_COURSE_LOADING_START' });
    axios.get(INITIATE_COURSE_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'INITIATE_COURSE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_INITIATE_COURSES_SUCCESS', payload: data });

        dispatch({
          type: 'EXPORT_TO_PRE_TEST_FORM_CHANGED_LOGIC',
          payload: {
            key: 'preTestType',
            value: 'INITIATE',
          },
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'INITIATE_COURSE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch initiate courses error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCompletedCoursesLogic,
];
