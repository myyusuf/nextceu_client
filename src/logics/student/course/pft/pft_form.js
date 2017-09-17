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

const pftFormChangedLogic = createLogic({
  type: 'PFT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_PFT_FORM', payload: result });
    done();
  },
});

const loadPftFormLogic = createLogic({
  type: 'LOAD_PFT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const pft = action.payload;
    const departmentId = pft.Department ?
    pft.Department.id : undefined;
    const pftForm = {
      id: {
        value: pft.id,
      },
      code: {
        value: pft.code,
      },
      name: {
        value: pft.name,
      },
      department: {
        value: String(departmentId),
      },
      active: {
        value: pft.active,
      },
    };
    const validationResult = {};
    const keys = _.keys(pftForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = pftForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_PFT_LOGIC' });
    dispatch({ type: 'LOAD_PFT', payload: validationResult });
    done();
  },
});

export default [
  pftFormChangedLogic,
  loadPftFormLogic,
];
