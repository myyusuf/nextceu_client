import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';

const HOSPITAL_STUDENTS_URL = `${Constant.serverUrl}/api/hospitalselect/hospitalstudents`;

const fetchHospitalStudentsLogic = createLogic({
  type: 'FETCH_HOSPITAL_STUDENTS_LOGIC',
  cancelType: 'CANCEL_FETCH_HOSPITAL_STUDENTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().hospitalReducers.hospitalDepartmentSearch;
    const paramameters = search ? { params: { ...search } } : {};
    const hospitalId = getState().hospitalReducers.hospitalForm.id.value;
    dispatch({ type: 'HOSPITAL_STUDENT_LOADING_START' });
    axios.get(`${HOSPITAL_STUDENTS_URL}/${hospitalId}`, paramameters)
      .then(resp => resp.data)
      .then((hospitalStudents) => {
        dispatch({ type: 'HOSPITAL_STUDENT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_HOSPITAL_STUDENTS_SUCCESS', payload: hospitalStudents });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HOSPITAL_STUDENT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch students error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchHospitalStudentsLogic,
];
