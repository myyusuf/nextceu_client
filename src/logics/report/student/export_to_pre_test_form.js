import { createLogic } from 'redux-logic';
import { validateExist } from '../../../utils/validation';

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

const exportToPreTestFormChangedLogic = createLogic({
  type: 'EXPORT_TO_PRE_TEST_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_EXPORT_TO_PRE_TEST_FORM', payload: result });
    done();
  },
});

export default [
  exportToPreTestFormChangedLogic,
];
