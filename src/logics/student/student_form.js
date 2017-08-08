import { createLogic } from 'redux-logic';
import { validateLength, validateEmail } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'oldSid':
    case 'newSid':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'email':
      result = validateEmail(key, value);
      break;
    default:
      break;
  }

  return result;
};

const studentFormChangedLogic = createLogic({
  type: 'STUDENT_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_STUDENT_FORM', payload: result });
    done();
  },
});

export default [
  studentFormChangedLogic,
];
