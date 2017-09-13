import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { validateExist } from '../../../utils/validation';
import * as actions from '../../../actions/ActionType';

const EXPORT_TO_PRE_TESTS_URL = `${Constant.serverUrl}/api/reports/initiatexpt`;

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

const doExportToPreTestLogic = createLogic({
  type: actions.report.student.initiateXpt.doExport,
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const exportToPreTestForm = {
      ...getState().reportReducers.exportToPreTestForm,
    };
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
      reject({
        type: actions.report.student.initiateXpt.form.showErrors,
        payload: validationResult,
        error: true,
      });
    }
  },
  process({ getState, action }, dispatch, done) {
    const exportToPreTestForm = _.mapValues({ ...getState().reportReducers.exportToPreTestForm }, 'value');
    exportToPreTestForm.courseIds = getState().reportReducers.completedCourseSelection.rowKeys;
    dispatch({ type: actions.report.student.initiateXpt.window.startLoading });

    axios.post(EXPORT_TO_PRE_TESTS_URL, exportToPreTestForm)
      .then(() => {
        dispatch({ type: actions.report.student.initiateXpt.window.finishLoading });
        dispatch({ type: actions.report.student.initiateXpt.form.clear });
        dispatch({ type: actions.report.student.initiateXpt.window.close });
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
        dispatch({ type: actions.report.student.initiateXpt.window.finishLoading });
        notification.error({
          message: 'Error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

export default [
  doExportToPreTestLogic,
];
