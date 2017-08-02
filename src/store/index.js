import { createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import rootReducer from '../reducers';

const { ajax } = Rx.Observable;
// import thunk from 'redux-thunk';

const FETCH_STUDENTS = 'FETCH_STUDENTS';
const FETCH_STUDENTS_FULFILLED = 'FETCH_STUDENTS_FULFILLED';

const fetchStudentsFulfilled = payload => ({ type: FETCH_STUDENTS_FULFILLED, students: payload });

const getStudentsEpic = action$ =>
  action$.ofType(FETCH_STUDENTS)
    .mergeMap(action =>
      ajax.getJSON(`http://localhost:3300/api/students`)
        .map(response => fetchStudentsFulfilled(response))
    );

export const rootEpic = combineEpics(
  getStudentsEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

// const store = createStore(rootReducer, compose(applyMiddleware(thunk),
const store = createStore(rootReducer, compose(applyMiddleware(epicMiddleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;