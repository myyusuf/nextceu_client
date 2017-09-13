import * as actions from '../../../actions/ActionType';

const defaultState = {
  preTestDate: {},
};

const initiateXptForm = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.initiateXpt.form.showErrors:
    case actions.report.student.initiateXpt.form.update: {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case actions.report.student.initiateXpt.form.clear:
      return { ...defaultState };
    default:
      return state;
  }
};

export default initiateXptForm;
