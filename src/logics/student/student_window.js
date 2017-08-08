import { createLogic } from 'redux-logic';

const openAddStudentWindow = createLogic({
  type: 'OPEN_ADD_STUDENT_WINDOW',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_STUDENT_FORM', error: true });
    dispatch({ type: 'SHOW_ADD_STUDENT_WINDOW', error: true });
    done();
  },
});

const closeAddStudentWindow = createLogic({
  type: 'CLOSE_ADD_STUDENT_WINDOW',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_STUDENT_FORM', error: true });
    dispatch({ type: 'HIDE_ADD_STUDENT_WINDOW', error: true });
    done();
  },
});

export default [
  openAddStudentWindow,
  closeAddStudentWindow,
];
