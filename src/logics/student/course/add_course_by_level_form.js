import { createLogic } from 'redux-logic';
import { validateLength, validateExist } from '../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'level':
    case 'startDate':
      result = validateExist(key, value, 3);
      break;
    case 'suffix':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const addCourseByLevelFormChangedLogic = createLogic({
  type: 'ADD_COURSE_BY_LEVEL_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_ADD_COURSE_BY_LEVEL_FORM', payload: result });
    done();
  },
});

export default [
  addCourseByLevelFormChangedLogic,
];
