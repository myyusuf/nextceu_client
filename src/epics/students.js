import Rx from 'rxjs';
import Constant from '../Constant';

const { ajax } = Rx.Observable;

const FETCH_STUDENTS = 'FETCH_STUDENTS';
const FETCH_STUDENT = 'FETCH_STUDENT';

const fetchStudentsFulfilled = payload => ({ type: 'LOAD_STUDENTS', students: payload });
const fetchStudentFulfilled = payload => ({ type: 'LOAD_STUDENT', student: payload });

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

export const getStudentsEpic = action$ =>
  action$.ofType(FETCH_STUDENTS)
    .mergeMap(() =>
      ajax.getJSON(STUDENTS_URL)
        .map(response => fetchStudentsFulfilled(response)),
    );

export const getStudentEpic = action$ =>
  action$.ofType(FETCH_STUDENT)
    .mergeMap(action =>
      ajax.getJSON(`${STUDENTS_URL}/${action.id}`)
        .map(response => fetchStudentFulfilled(response)),
    );
