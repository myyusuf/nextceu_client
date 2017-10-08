import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateExist } from '../../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'sglType':
    case 'sglDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const sglFormChangedLogic = createLogic({
  type: 'SGL_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SGL_FORM', payload: result });
    done();
  },
});

const loadSglFormLogic = createLogic({
  type: 'LOAD_SGL_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const sgl = action.payload;
    const sglTypeId = sgl.SglType ?
    sgl.SglType.id : undefined;

    const mainTutorId = sgl.mainTutorId ? String(sgl.mainTutorId) : undefined;
    const secondTutorId = sgl.secondTutorId ? String(sgl.secondTutorId) : undefined;
    const thirdTutorId = sgl.thirdTutorId ? String(sgl.thirdTutorId) : undefined;

    if (sgl.sglDate) {
      sgl.sglDate = moment(sgl.sglDate);
    }
    const sglForm = {
      id: {
        value: sgl.id,
      },
      sglType: {
        value: String(sglTypeId),
      },
      mainTutor: {
        value: mainTutorId,
      },
      secondTutor: {
        value: secondTutorId,
      },
      thirdTutor: {
        value: thirdTutorId,
      },
      mainTutorPresent: {
        value: sgl.mainTutorPresent,
      },
      secondTutorPresent: {
        value: sgl.secondTutorPresent,
      },
      thirdTutorPresent: {
        value: sgl.thirdTutorPresent,
      },
      sglDate: {
        value: sgl.sglDate,
      },
      completed: {
        value: sgl.completed,
      },
    };
    const validationResult = {};
    const keys = _.keys(sglForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = sglForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_SGL_LOGIC' });
    dispatch({ type: 'LOAD_SGL', payload: validationResult });
    done();
  },
});

export default [
  sglFormChangedLogic,
  loadSglFormLogic,
];
