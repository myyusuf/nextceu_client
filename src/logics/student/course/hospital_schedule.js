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
    const resultContainer = getState().studentReducers.hospitalScheduleWindow.resultContainer;
    let hospitalType = '1';
    if (resultContainer === 'clinic') {
      hospitalType = '2';
    }
    const search = {
      department,
      student,
      startDate,
      endDate,
      hospitalType,
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
          message: 'Fetch schedules error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const hospitalScheduleDidSelectLogic = createLogic({
  type: 'HOSPITAL_SCHEDULE_DID_SELECT_LOGIC',
  process({ getState, action }, dispatch, done) {
    const key = getState().studentReducers.hospitalScheduleWindow.resultContainer;
    const value = getState().studentReducers.hospitalScheduleSelection.selectedRows[0];

    dispatch({
      type: 'COURSE_FORM_CHANGED_LOGIC',
      payload: { key, value },
    });

    if (key === 'clinic') {
      dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload: { key: 'dpk', value: null },
      });
    } else {
      dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload: { key: 'adviser', value: null },
      });
      dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload: { key: 'examiner', value: null },
      });
      dispatch({
        type: 'CLEAR_DOCENTS_BY_HD',
      });
    }

    dispatch({
      type: 'HIDE_HOSPITAL_SCHEDULE_WINDOW',
    });

    done();
  },
});

export default [
  fetchHospitalSchedulesLogic,
  hospitalScheduleDidSelectLogic,
];
