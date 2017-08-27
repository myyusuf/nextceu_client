import { createLogic } from 'redux-logic';
import { validateLength, validateExist } from '../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'department':
    case 'startDate':
      result = validateExist(key, value, 3);
      break;
    case 'title':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const addCourseByDepartmentFormChangedLogic = createLogic({
  type: 'ADD_COURSE_BY_DEPARTMENT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_ADD_COURSE_BY_DEPARTMENT_FORM', payload: result });
    done();
  },
});

export default [
  addCourseByDepartmentFormChangedLogic,
];
