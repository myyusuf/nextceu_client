import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import * as actions from '../../../actions/ActionType';
import { validate } from './assistance_xpt_form';

const EXPORT_TO_PRE_TESTS_URL = `${Constant.serverUrl}/api/reports/assistancexpt`;

const doExportToPreTestLogic = createLogic({
  type: actions.report.student.assistanceXpt.doExport,
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const exportToPreTestForm = {
      ...getState().reportReducers.assistanceXptForm,
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
        type: actions.report.student.assistanceXpt.form.showErrors,
        payload: validationResult,
        error: true,
      });
    }
  },
  process({ getState, action }, dispatch, done) {
    const exportToPreTestForm = _.mapValues({ ...getState().reportReducers.assistanceXptForm }, 'value');
    exportToPreTestForm.courseIds = getState().reportReducers.assistanceCourseSelection.rowKeys;
    dispatch({ type: actions.report.student.assistanceXpt.window.startLoading });

    axios.post(EXPORT_TO_PRE_TESTS_URL, exportToPreTestForm)
      .then(() => {
        dispatch({ type: actions.report.student.assistanceXpt.window.finishLoading });
        dispatch({ type: actions.report.student.assistanceXpt.form.clear });
        dispatch({ type: actions.report.student.assistanceXpt.window.close });
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
        dispatch({ type: actions.report.student.assistanceXpt.window.finishLoading });
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
