import { createLogic } from 'redux-logic';

const openCourseWindow = createLogic({
  type: 'OPEN_COURSE_WINDOW',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_COURSE_FORM' });
    dispatch({ type: 'SHOW_COURSE_WINDOW', payload: action.payload });
    done();
  },
});

const closeCourseWindow = createLogic({
  type: 'CLOSE_COURSE_WINDOW',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_COURSE_FORM' });
    dispatch({ type: 'HIDE_COURSE_WINDOW' });
    done();
  },
});

export default [
  openCourseWindow,
  closeCourseWindow,
];
