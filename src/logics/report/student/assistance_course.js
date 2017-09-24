import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import * as actions from '../../../actions/ActionType';

const ASSISTANCE_COURSE_REPORTS_URL = `${Constant.serverUrl}/api/reports/assistancecourses`;

const fetchAssistanceCoursesLogic = createLogic({
  type: actions.report.student.assistanceCourse.fetchCourses,
  cancelType: actions.report.student.assistanceCourse.cancelFetchCourses,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.assistanceCourseSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: actions.report.student.assistanceCourse.list.loadingStart });
    axios.get(ASSISTANCE_COURSE_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: actions.report.student.assistanceCourse.list.loadingFinish });
        dispatch({
          type: actions.report.student.assistanceCourse.fetchCoursesSuccess,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actions.report.student.assistanceCourse.list.loadingFinish });
        notification.error({
          message: 'Fetch assistance courses error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchAssistanceCoursesLogic,
];
