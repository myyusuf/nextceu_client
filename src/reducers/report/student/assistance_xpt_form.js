import * as actions from '../../../actions/ActionType';

const defaultState = {
  preTestDate: {},
};

const assistanceXptForm = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.assistanceXpt.form.showErrors:
    case actions.report.student.assistanceXpt.form.update: {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case actions.report.student.assistanceXpt.form.clear:
      return { ...defaultState };
    default:
      return state;
  }
};

export default assistanceXptForm;
