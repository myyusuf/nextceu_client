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

const hospitalFormChangedLogic = createLogic({
  type: 'HOSPITAL_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_HOSPITAL_FORM', payload: result });
    done();
  },
});

const loadHospitalFormLogic = createLogic({
  type: 'LOAD_HOSPITAL_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const hospital = action.payload;
    const hospitalForm = {
      id: {
        value: hospital.id,
      },
      code: {
        value: hospital.code,
      },
      name: {
        value: hospital.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(hospitalForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = hospitalForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_HOSPITAL_LOGIC' });
    dispatch({ type: 'LOAD_HOSPITAL', payload: validationResult });
    done();
  },
});

export default [
  hospitalFormChangedLogic,
  loadHospitalFormLogic,
];
