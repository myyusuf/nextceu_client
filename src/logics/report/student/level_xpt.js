import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import * as actions from '../../../actions/ActionType';
import { validate } from './level_xpt_form';

const EXPORT_TO_PRE_TESTS_URL = `${Constant.serverUrl}/api/reports/levelxpt`;

const doExportToPreTestLogic = createLogic({
  type: actions.report.student.levelXpt.doExport,
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const exportToPreTestForm = {
      ...getState().reportReducers.levelXptForm,
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
        type: actions.report.student.levelXpt.form.showErrors,
        payload: validationResult,
        error: true,
      });
    }
  },
  process({ getState, action }, dispatch, done) {
    const exportToPreTestForm = _.mapValues({ ...getState().reportReducers.levelXptForm }, 'value');
    exportToPreTestForm.courseIds = getState().reportReducers.levelCourseSelection.rowKeys;
    dispatch({ type: actions.report.student.levelXpt.window.startLoading });

    axios.post(EXPORT_TO_PRE_TESTS_URL, exportToPreTestForm)
      .then(() => {
        dispatch({ type: actions.report.student.levelXpt.window.finishLoading });
        dispatch({ type: actions.report.student.levelXpt.form.clear });
        dispatch({ type: actions.report.student.levelXpt.window.close });
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
        dispatch({ type: actions.report.student.levelXpt.window.finishLoading });
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
