import { createLogic } from 'redux-logic';

const addSeminarLogic = createLogic({
  type: 'ADD_SEMINAR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SEMINAR_FORM' });
    dispatch({ type: 'SHOW_SEMINAR_WINDOW' });
    done();
  },
});

const cancelAddSeminarLogic = createLogic({
  type: 'CANCEL_ADD_SEMINAR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SEMINAR_FORM' });
    dispatch({ type: 'HIDE_SEMINAR_WINDOW' });
    done();
  },
});

const saveSeminarLogic = createLogic({
  type: 'SAVE_SEMINAR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SEMINAR_FORM' });
    dispatch({ type: 'HIDE_SEMINAR_WINDOW' });
    done();
  },
});

export default [
  addSeminarLogic,
  cancelAddSeminarLogic,
  saveSeminarLogic,
];
