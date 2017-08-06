import { createLogic } from 'redux-logic';
import axios from 'axios';

import Constant from '../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const FETCH_STUDENTS = 'FETCH_STUDENTS';
const CANCEL_FETCH_STUDENTS = 'CANCEL_FETCH_STUDENTS';
const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
const FETCH_STUDENTS_FAILED = 'FETCH_STUDENTS_FAILED';


const fetchPollsLogic = createLogic({
  type: FETCH_STUDENTS, // only apply this logic to this type
  cancelType: CANCEL_FETCH_STUDENTS, // cancel on this type
  latest: true, // only take latest
  process({ getState, action }, dispatch, done) {
    axios.get(STUDENTS_URL)
      .then(resp => resp.data)
      .then(students => dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students }))
      .catch((err) => {
        console.error(err); // log since could be render err
        dispatch({ type: FETCH_STUDENTS_FAILED, payload: err, error: true });
      })
      .then(() => done());
  },
});

export default [
  fetchPollsLogic,
];
