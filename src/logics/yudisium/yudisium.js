import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateForm } from './ysc_form';
import * as actions from '../../actions/ActionType';

const YUDISIUM_CHECKLISTS_URL = `${Constant.serverUrl}/api/yudisiumchecklists`;

const fetchYscLogic = createLogic({
  type: actions.yudisium.yudisium.fetchData,
  cancelType: actions.yudisium.yudisium.cancelFetchData,
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(`${YUDISIUM_CHECKLISTS_URL}/findbystudent/${action.payload.id}`)
      .then(resp => resp.data)
      .then(student => dispatch({ type: actions.yudisium.yscForm.loadData, payload: student }))
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch yudisium checklist error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const saveYudisiumLogic = createLogic({
  type: actions.yudisium.yudisium.save,
  latest: true,
  validate({ getState, action }, allow, reject) {
    const yscForm = { ...getState().yudisiumReducers.yscForm };
    const validatedForm = validateForm(yscForm);
    if (validatedForm.isFormValid) {
      allow(action);
    } else {
      reject({
        type: actions.yudisium.yscForm.showErrors,
        payload: validatedForm.validationResult,
        error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const yscForm = _.mapValues({ ...getState().yudisiumReducers.yscForm }, 'value');
    dispatch({ type: actions.yudisium.yudisiumWindow.loadingStart });

    axios.put(`${YUDISIUM_CHECKLISTS_URL}/${yscForm.id}`, yscForm)
      .then(() => {
        dispatch({ type: actions.yudisium.yudisiumWindow.loadingFinish });
        dispatch({ type: actions.yudisium.yudisiumWindow.close });
        notification.success({
          message: 'Update yudisium success',
          description: 'Success saving yudisium',
        });
      })
      .catch((err) => {
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Error';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        dispatch({ type: actions.yudisium.yudisiumWindow.loadingFinish });
        notification.error({
          message: 'Update role error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  fetchYscLogic,
  saveYudisiumLogic,
];