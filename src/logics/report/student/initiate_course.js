import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { mathRandom } from '../../../utils/random';
import * as actions from '../../../actions/ActionType';

const INITIATE_COURSE_REPORTS_URL = `${Constant.serverUrl}/api/reports/initiatecourses`;

const fetchCompletedCoursesLogic = createLogic({
  type: actions.report.student.initiateCourse.fetchCourses,
  cancelType: actions.report.student.initiateCourse.cancelFetchCourses,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.initiateCourseSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: actions.report.student.initiateCourse.list.loadingStart });
    axios.get(INITIATE_COURSE_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: actions.report.student.initiateCourse.list.loadingFinish });
        dispatch({
          type: actions.report.student.initiateCourse.fetchCoursesSuccess,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actions.report.student.initiateCourse.list.loadingFinish });
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
