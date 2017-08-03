import Rx from 'rxjs';
import Constant from '../Constant';

const { ajax } = Rx.Observable;

const FETCH_COURSES = 'FETCH_COURSES';

const fetchCoursesFulfilled = payload => ({ type: 'LOAD_COURSES', courses: payload });

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

export const getCoursesEpic = action$ =>
  action$.ofType(FETCH_COURSES)
    .mergeMap(action =>
      ajax.getJSON(`${STUDENTS_URL}/${action.studentId}/courses`)
        .map(response => fetchCoursesFulfilled(response)),
    );
