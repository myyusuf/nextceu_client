import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength, validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'hospitalType':
      result = validateExist(key, value);
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

const hospitalModalFormChangedLogic = createLogic({
  type: 'HOSPITAL_MODAL_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_HOSPITAL_MODAL_FORM', payload: result });
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
      hospitalType: {
        value: String(hospital.hospitalType),
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

    dispatch({ type: 'CLEAR_HOSPITAL_FORM' });
    dispatch({ type: 'LOAD_HOSPITAL', payload: validationResult });
    done();
  },
});

export default [
  hospitalFormChangedLogic,
  hospitalModalFormChangedLogic,
  loadHospitalFormLogic,
];
