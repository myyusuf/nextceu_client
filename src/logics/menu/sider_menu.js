import { createLogic } from 'redux-logic';

const selectSiderMenuLogic = createLogic({
  type: 'SELECT_SIDER_MENU_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SELECT_SIDER_MENU', payload: action.payload });
    done();
  },
});

export default [
  selectSiderMenuLogic,
];
