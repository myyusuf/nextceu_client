import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength, validateExist } from '../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const smtFormChangedLogic = createLogic({
  type: 'SMT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SMT_FORM', payload: result });
    done();
  },
});

const loadSmtFormLogic = createLogic({
  type: 'LOAD_SMT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const smt = action.payload;
    const departmentId = smt.Department ?
    smt.Department.id : undefined;
    const smtForm = {
      id: {
        value: smt.id,
      },
      code: {
        value: smt.code,
      },
      name: {
        value: smt.name,
      },
      department: {
        value: String(departmentId),
      },
      active: {
        value: smt.active,
      },
    };
    const validationResult = {};
    const keys = _.keys(smtForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = smtForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_SMT_LOGIC' });
    dispatch({ type: 'LOAD_SMT', payload: validationResult });
    done();
  },
});

export default [
  smtFormChangedLogic,
  loadSmtFormLogic,
];
