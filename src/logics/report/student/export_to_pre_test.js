import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { validateExist } from '../../../utils/validation';

const EXPORT_TO_PRE_TESTS_URL = `${Constant.serverUrl}/api/exportToPreTests`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'preTestDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const prepExportToPreTestLogic = createLogic({
  type: 'PREP_EXPORT_TO_PRE_TEST_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_EXPORT_TO_PRE_TEST_FORM' });
    dispatch({ type: 'SHOW_EXPORT_TO_PRE_TEST_WINDOW' });
    done();
  },
});

const cancelPrepExportToPreTestLogic = createLogic({
  type: 'CANCEL_PREP_EXPORT_TO_PRE_TEST_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_EXPORT_TO_PRE_TEST_FORM' });
    dispatch({ type: 'HIDE_EXPORT_TO_PRE_TEST_WINDOW' });
    done();
  },
});

const doExportToPreTestLogic = createLogic({
  type: 'DO_EXPORT_TO_PRE_TEST_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const exportToPreTestForm = { ...getState().reportReducers.exportToPreTestForm };
    const validationResult = {};
    const keys = _.keys(exportToPreTestForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = exportToPreTestForm[key].value;
        validationResult[key] = {
          value,
          ...validate(key, value),
        };

        if (validationResult[key].validateStatus && validationResult[key].validateStatus === 'error') {
          isFormValid = false;
        }
      }
    }

    if (isFormValid) {
      allow(action);
    } else {
      reject({ type: 'SHOW_EXPORT_TO_PRE_TEST_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const exportToPreTestForm = _.mapValues({ ...getState().userReducers.exportToPreTestForm }, 'value');
    dispatch({ type: 'SHOW_EXPORT_TO_PRE_TEST_WINDOW_CONFIRM_LOADING' });

    axios.post(EXPORT_TO_PRE_TESTS_URL, exportToPreTestForm)
      .then(() => {
        dispatch({ type: 'HIDE_EXPORT_TO_PRE_TEST_WINDOW_CONFIRM_LOADING' });
        dispatch({ type: 'CANCEL_PREP_EXPORT_TO_PRE_TEST_LOGIC' });
        dispatch({ type: 'FETCH_EXPORT_TO_PRE_TESTS_LOGIC' });
        notification.success({
          message: 'Export success',
          description: 'Success exporting students.',
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
        dispatch({ type: 'HIDE_EXPORT_TO_PRE_TEST_WINDOW_CONFIRM_LOADING' });
        notification.error({
          message: 'Error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  prepExportToPreTestLogic,
  cancelPrepExportToPreTestLogic,
  doExportToPreTestLogic,
];
