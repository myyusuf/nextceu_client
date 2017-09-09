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
    case 'hospital':
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const docentFormChangedLogic = createLogic({
  type: 'DOCENT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_DOCENT_FORM', payload: result });
    done();
  },
});

const loadUserFormLogic = createLogic({
  type: 'LOAD_DOCENT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const docent = action.payload;
    const hospitalId = docent.Hospital.id;
    const departmentId = docent.Department.id;
    const docentForm = {
      id: {
        value: docent.id,
      },
      code: {
        value: docent.code,
      },
      name: {
        value: docent.name,
      },
      hospital: {
        value: hospitalId,
      },
      department: {
        value: departmentId,
      },
    };
    const validationResult = {};
    const keys = _.keys(docentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = docentForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_DOCENT_LOGIC' });
    dispatch({ type: 'LOAD_DOCENT', payload: validationResult });
    done();
  },
});

export default [
  docentFormChangedLogic,
  loadUserFormLogic,
];
