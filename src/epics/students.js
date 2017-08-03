import Rx from 'rxjs';
import Constant from '../Constant';

const { ajax } = Rx.Observable;

const FETCH_STUDENTS = 'FETCH_STUDENTS';
const FETCH_STUDENTS_FULFILLED = 'FETCH_STUDENTS_FULFILLED';
const fetchStudentsFulfilled = payload => ({ type: FETCH_STUDENTS_FULFILLED, students: payload });

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

export const getStudentsEpic = action$ =>
  action$.ofType(FETCH_STUDENTS)
    .mergeMap(action =>
      ajax.getJSON(STUDENTS_URL)
        .map(response => fetchStudentsFulfilled(response))
    );
