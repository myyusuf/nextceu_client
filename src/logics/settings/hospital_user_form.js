import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'hospital':
    case 'user':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const hospitalUserFormChangedLogic = createLogic({
  type: 'HOSPITAL_USER_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_HOSPITAL_USER_FORM', payload: result });
    done();
  },
});

const loadHospitalUserFormLogic = createLogic({
  type: 'LOAD_HOSPITAL_USER_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const hospitalUser = action.payload;
    const userId = hospitalUser.User.id;
    const hospitalId = hospitalUser.Hospital.id;
    const hospitalUserForm = {
      id: {
        value: hospitalUser.id,
      },
      user: {
        value: String(userId),
      },
      hospital: {
        value: String(hospitalId),
      },
    };
    const validationResult = {};
    const keys = _.keys(hospitalUserForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = hospitalUserForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_HOSPITAL_USER_LOGIC' });
    dispatch({ type: 'LOAD_HOSPITAL_USER', payload: validationResult });
    done();
  },
});

export default [
  hospitalUserFormChangedLogic,
  loadHospitalUserFormLogic,
];
