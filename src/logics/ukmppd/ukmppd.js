import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';

const UKMPPD_URL = `${Constant.serverUrl}/api/ukmppd`;

const editUkmppdLogic = createLogic({
  type: 'EDIT_UKMPPD_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_UKMPPD_FORM' });
    dispatch({ type: 'SHOW_UKMPPD_WINDOW' });
    done();
  },
});

const cancelEditUkmppdLogic = createLogic({
  type: 'CANCEL_EDIT_UKMPPD_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_UKMPPD_FORM' });
    dispatch({ type: 'HIDE_UKMPPD_WINDOW' });
    done();
  },
});

export default [
  editUkmppdLogic,
  cancelEditUkmppdLogic,
];
