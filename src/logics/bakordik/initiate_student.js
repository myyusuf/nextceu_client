import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';
import * as actions from '../../actions/ActionType';

const INITIATE_COURSE_REPORTS_URL = `${Constant.serverUrl}/api/bakordik/initiatestudents`;

const fetchCompletedCoursesLogic = createLogic({
  type: actions.bakordik.initiateStudent.fetchCourses,
  cancelType: actions.bakordik.initiateStudent.cancelFetchCourses,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().bakordikReducers.initiateStudentSearch;
    const token = window.sessionStorage.getItem('token');
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    paramameters.headers = { token };
    dispatch({ type: actions.bakordik.initiateStudent.list.loadingStart });
    axios.get(INITIATE_COURSE_REPORTS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: actions.bakordik.initiateStudent.list.loadingFinish });
        dispatch({
          type: actions.bakordik.initiateStudent.fetchCoursesSuccess,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actions.bakordik.initiateStudent.list.loadingFinish });
        notification.error({
          message: 'Fetch initiate courses error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const initiateStudentPageChangedLogic = createLogic({
  type: actions.bakordik.initiateStudent.list.search.pageChange,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: actions.bakordik.initiateStudent.list.search.pageChanged, payload: action.payload });
    dispatch({ type: actions.bakordik.initiateStudent.fetchCourses });
    done();
  },
});

export default [
  fetchCompletedCoursesLogic,
  initiateStudentPageChangedLogic,
];
