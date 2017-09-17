import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength, validateExist } from '../../../../utils/validation';

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

const sgtFormChangedLogic = createLogic({
  type: 'SGT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SGT_FORM', payload: result });
    done();
  },
});

const loadSgtFormLogic = createLogic({
  type: 'LOAD_SGT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const sgt = action.payload;
    const departmentId = sgt.Department ?
    sgt.Department.id : undefined;
    const sgtForm = {
      id: {
        value: sgt.id,
      },
      code: {
        value: sgt.code,
      },
      name: {
        value: sgt.name,
      },
      department: {
        value: String(departmentId),
      },
      active: {
        value: sgt.active,
      },
    };
    const validationResult = {};
    const keys = _.keys(sgtForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = sgtForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_SGT_LOGIC' });
    dispatch({ type: 'LOAD_SGT', payload: validationResult });
    done();
  },
});

export default [
  sgtFormChangedLogic,
  loadSgtFormLogic,
];
