import { createLogic } from 'redux-logic';
import { validateFormFields, validateFormField } from '../../utils/validation';
import * as actions from '../../actions/ActionType';

export const validate = (key, value) => {
  return null;
};

export const validateForm = form => (validateFormFields(form, validate));

const yscFormChangedLogic = createLogic({
  type: actions.yudisium.yscForm.changed,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const result = validateFormField(action.payload, validate);
    dispatch({ type: actions.yudisium.yscForm.update, payload: result });
    done();
  },
});

const loadYscFormLogic = createLogic({
  type: actions.yudisium.yscForm.loadData,
  process({ getState, action }, dispatch, done) {
    const ysc = action.payload;
    const yscForm = {
      id: {
        value: ysc.id,
      },
      checklist1: {
        value: ysc.checklist1,
      },
      checklist2: {
        value: ysc.checklist2,
      },
      checklist3: {
        value: ysc.checklist3,
      },
    };
    const validationResult = validateFormFields(yscForm, validate).validationResult;
    dispatch({ type: action.yudisium.yscForm.setForm, payload: validationResult });
    done();
  },
});

export default [
  yscFormChangedLogic,
  loadYscFormLogic,
];
