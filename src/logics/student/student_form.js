import { createLogic } from 'redux-logic';
import moment from 'moment';
import {
  validateLength,
  validateEmail,
  validateExist,
  validateFormFields,
  validateFormField,
} from '../../utils/validation';

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
    case 'gender':
      result = validateExist(key, value);
      break;
    case 'level':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

export const validateForm = form => (validateFormFields(form, validate));

const studentFormChangedLogic = createLogic({
  type: 'STUDENT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const result = validateFormField(action.payload, validate);
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
      gender: {
        value: student.gender,
      },
      level: {
        value: String(student.level),
      },
      email: {
        value: student.email,
      },
      birthDate: {
        value: student.birthDate ? moment(student.birthDate) : null,
      },
      address: {
        value: student.address,
      },
      phone: {
        value: student.phone,
      },
      mobilePhone: {
        value: student.mobilePhone,
      },
      enrollYear: {
        value: student.enrollYear,
      },
      graduateYear: {
        value: student.graduateYear,
      },
      certificateNumber: {
        value: student.certificateNumber,
      },
      ipk: {
        value: student.ipk,
      },
      krs: {
        value: student.krs,
      },
      krsFileId: {
        value: student.krsFileId,
      },
      spp: {
        value: student.spp,
      },
      fatherName: {
        value: student.fatherName,
      },
      motherName: {
        value: student.motherName,
      },
      parentAddress: {
        value: student.parentAddress,
      },
      parentPhone: {
        value: student.parentPhone,
      },
      parentMobilePhone: {
        value: student.parentMobilePhone,
      },
    };
    const validationResult = validateFormFields(studentForm, validate).validationResult;
    dispatch({ type: 'EDIT_STUDENT_LOGIC' });
    dispatch({ type: 'LOAD_STUDENT', payload: validationResult });
    done();
  },
});

export default [
  studentFormChangedLogic,
  loadStudentFormLogic,
];
