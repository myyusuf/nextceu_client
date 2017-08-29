import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'quota':
    case 'department':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const hospitalDepartmentFormChangedLogic = createLogic({
  type: 'HOSPITAL_DEPARTMENT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_HOSPITAL_DEPARTMENT_FORM', payload: result });
    done();
  },
});

const loadHospitalDepartmentFormLogic = createLogic({
  type: 'LOAD_HOSPITAL_DEPARTMENT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const hospitalDepartment = action.payload;
    const hospitalDepartmentForm = {
      id: {
        value: hospitalDepartment.id,
      },
      department: {
        value: hospitalDepartment.department,
      },
      quota: {
        value: hospitalDepartment.quota,
      },
    };
    const validationResult = {};
    const keys = _.keys(hospitalDepartmentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = hospitalDepartmentForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_HOSPITAL_DEPARTMENT_LOGIC' });
    dispatch({ type: 'LOAD_HOSPITAL_DEPARTMENT', payload: validationResult });
    done();
  },
});

export default [
  hospitalDepartmentFormChangedLogic,
  loadHospitalDepartmentFormLogic,
];
