import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { mathRandom } from '../../../utils/random';
import * as actions from '../../../actions/ActionType';

const LEVEL_COURSE_REPORTS_URL = `${Constant.serverUrl}/api/reports/levelcourses`;

const fetchCompletedCoursesLogic = createLogic({
  type: actions.report.student.levelCourse.fetchCourses,
  cancelType: actions.report.student.levelCourse.cancelFetchCourses,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.levelCourseSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: actions.report.student.levelCourse.list.loadingStart });
    axios.get(LEVEL_COURSE_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: actions.report.student.levelCourse.list.loadingFinish });
        dispatch({
          type: actions.report.student.levelCourse.fetchCoursesSuccess,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actions.report.student.levelCourse.list.loadingFinish });
        notification.error({
          message: 'Fetch level courses error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCompletedCoursesLogic,
];
