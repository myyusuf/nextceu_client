import Rx from 'rxjs';
import _ from 'lodash';
import Constant from '../Constant';
import { validateLength, validateEmail } from '../utils/validation';


const { ajax } = Rx.Observable;

const FETCH_STUDENTS = 'FETCH_STUDENTS';
const FETCH_STUDENT = 'FETCH_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';

const fetchStudentsFulfilled = payload => ({ type: 'LOAD_STUDENTS', students: payload });
const fetchStudentFulfilled = payload => ({ type: 'LOAD_STUDENT', student: payload });
const createStudentFulfilled = () => ({ type: 'FETCH_STUDENTS' });
const updateStudentForm = payload => ({ type: 'UPDATE_STUDENT_FORM', payload });

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

export const createStudentEpic = action$ =>
  action$.ofType(CREATE_STUDENT)
    .mergeMap((action) => {
      const data = _.mapValues(action.payload, o => o.value);
      return ajax.post(`${STUDENTS_URL}`, data).map(response => createStudentFulfilled(response));
    },
  );

export const updateStudentFormEpic = action$ =>
  action$.ofType('STUDENT_FORM_CHANGED')
    .mergeMap((action) => {
      const payload = action.payload;
      let result = null;
      switch (payload.name) {
        case 'oldSid':
        case 'newSid':
        case 'name':
          result = {
            ...payload,
            ...validateLength(payload.name, payload.value, 3),
          };
          break;
        case 'email':
          result = {
            ...payload,
            ...validateEmail(payload.name, payload.value),
          };
          break;
        default:
          result = payload;
          break;
      }

      // return new Promise((resolve, reject) => {
      //   console.log('======>', 'updateStudentForm');
      //   resolve(updateStudentForm(result));
      // });
      return Rx.Observable.create((observer) => {
        observer.next(updateStudentForm(result));
      });
    },
  );
