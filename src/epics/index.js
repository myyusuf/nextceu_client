import { combineEpics } from 'redux-observable';
import { getStudentsEpic, getStudentEpic } from './students';
import { getCoursesEpic } from './courses';

const rootEpic = combineEpics(
  getStudentsEpic,
  getStudentEpic,
  getCoursesEpic,
);

export default rootEpic;
