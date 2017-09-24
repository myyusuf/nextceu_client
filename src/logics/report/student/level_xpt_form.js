import { createLogic } from 'redux-logic';
import { validateExist } from '../../../utils/validation';
import * as actions from '../../../actions/ActionType';

export const validate = (key, value) => {
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

const exportToPreTestFormChangedLogic = createLogic({
  type: actions.report.student.levelXpt.form.changed,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: actions.report.student.levelXpt.form.update, payload: result });
    done();
  },
});

export default [
  exportToPreTestFormChangedLogic,
];
