import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength, validateEmail, validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'oldSid':
    case 'newSid':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'email':
      result = validateEmail(key, value);
      break;
    case 'level':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const studentFormChangedLogic = createLogic({
  type: 'STUDENT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_STUDENT_FORM', payload: result });
    done();
  },
});


const loadStudentFormLogic = createLogic({
  type: 'LOAD_STUDENT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const student = action.payload;
    const studentForm = {
      id: {
        value: student.id,
      },
      oldSid: {
        value: student.oldSid,
      },
      newSid: {
        value: student.newSid,
      },
      name: {
        value: student.name,
      },
      level: {
        value: student.level,
      },
      email: {
        value: student.email,
      },
    };
    const validationResult = {};
    const keys = _.keys(studentForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = studentForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_STUDENT_LOGIC' });
    dispatch({ type: 'LOAD_STUDENT', payload: validationResult });
    done();
  },
});

export default [
  studentFormChangedLogic,
  loadStudentFormLogic,
];
