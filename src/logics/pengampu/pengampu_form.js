import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateExist, validateLength } from '../../utils/validation';

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

const penagmpuFormChangedLogic = createLogic({
  type: 'PENGAMPU_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_PENGAMPU_FORM', payload: result });
    done();
  },
});

const loadPengampuFormLogic = createLogic({
  type: 'LOAD_PENGAMPU_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const penagmpu = action.payload;
    const departmentId = penagmpu.Department.id;
    const penagmpuForm = {
      id: {
        value: penagmpu.id,
      },
      code: {
        value: penagmpu.code,
      },
      name: {
        value: penagmpu.name,
      },
      department: {
        value: String(departmentId),
      },
    };
    const validationResult = {};
    const keys = _.keys(penagmpuForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = penagmpuForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_PENGAMPU_LOGIC' });
    dispatch({ type: 'LOAD_PENGAMPU', payload: validationResult });
    done();
  },
});

export default [
  penagmpuFormChangedLogic,
  loadPengampuFormLogic,
];
