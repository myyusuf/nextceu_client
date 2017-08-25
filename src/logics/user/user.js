import { createLogic } from 'redux-logic';

const addUserLogic = createLogic({
  type: 'ADD_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_USER_FORM' });
    dispatch({ type: 'SHOW_USER_WINDOW' });
    done();
  },
});

const cancelAddUserLogic = createLogic({
  type: 'CANCEL_ADD_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_USER_FORM' });
    dispatch({ type: 'HIDE_USER_WINDOW' });
    done();
  },
});

const saveUserLogic = createLogic({
  type: 'SAVE_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_USER_FORM' });
    dispatch({ type: 'HIDE_USER_WINDOW' });
    done();
  },
});

export default [
  addUserLogic,
  cancelAddUserLogic,
  saveUserLogic,
];
