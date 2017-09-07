import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';

const COURSES_URL = `${Constant.serverUrl}/api/courses`;

const fetchCptsLogic = createLogic({
  type: 'FETCH_COURSE_SEMINARS_LOGIC',
  cancelType: 'CANCEL_FETCH_COURSE_SEMINARS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const realStartDate = getState().studentReducers.courseForm.realStartDate;
    const realEndDate = getState().studentReducers.courseForm.realEndDate;
    const startDate = realStartDate ? realStartDate.value : null;
    const endDate = realEndDate ? realEndDate.value : null;
    const search = {
      startDate,
      endDate,
    };
    const paramameters = search ? { params: { ...search } } : {};
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'COURSE_SEMINAR_LOADING_START' });
    axios.get(`${COURSES_URL}/${courseId}/courseseminars`, paramameters)
      .then(resp => resp.data)
      .then((cpts) => {
        dispatch({ type: 'COURSE_SEMINAR_LOADING_FINISH' });
        dispatch({ type: 'FETCH_COURSE_SEMINARS_SUCCESS', payload: cpts });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'COURSE_SEMINAR_LOADING_FINISH' });
        notification.error({
          message: 'Fetch seminar error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCptsLogic,
];
