import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const departmentFormChangedLogic = createLogic({
  type: 'DEPARTMENT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_DEPARTMENT_FORM', payload: result });
    done();
  },
});

const loadDepartmentFormLogic = createLogic({
  type: 'LOAD_DEPARTMENT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const department = action.payload;
    const departmentForm = {
      id: {
        value: department.id,
      },
      code: {
        value: department.code,
      },
      name: {
        value: department.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(departmentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = departmentForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_DEPARTMENT_LOGIC' });
    dispatch({ type: 'LOAD_DEPARTMENT', payload: validationResult });
    done();
  },
});

export default [
  departmentFormChangedLogic,
  loadDepartmentFormLogic,
];
