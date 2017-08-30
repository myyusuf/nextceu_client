import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';

const HOSPITAL_SCHEDULES_URL = `${Constant.serverUrl}/api/hospitalselect`;

const fetchHospitalSchedulesLogic = createLogic({
  type: 'FETCH_HOSPITAL_SCHEDULES_LOGIC',
  cancelType: 'CANCEL_FETCH_HOSPITAL_SCHEDULES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    // const search = getState().userReducers.roleSearch;
    const dateRange = getState().studentReducers.hospitalScheduleSearch.dateRange;
    const department = getState().studentReducers.hospitalScheduleSearch.department;
    const student = getState().studentReducers.student.id;
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    const search = {
      department,
      student,
      startDate,
      endDate,
    };
    const paramameters = { params: { ...search } };
    dispatch({ type: 'HOSPITAL_SCHEDULE_LOADING_START' });
    axios.get(HOSPITAL_SCHEDULES_URL, paramameters)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'HOSPITAL_SCHEDULE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_HOSPITAL_SCHEDULES_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HOSPITAL_SCHEDULE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch roles error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchHospitalSchedulesLogic,
];