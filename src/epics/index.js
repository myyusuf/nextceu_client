import { combineEpics } from 'redux-observable';
import { getStudentsEpic, getStudentEpic, createStudentEpic } from './students';
import { getCoursesEpic } from './courses';

const rootEpic = combineEpics(
  getStudentsEpic,
  getStudentEpic,
  createStudentEpic,
  getCoursesEpic,
);

export default rootEpic;
