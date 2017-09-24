import * as actions from '../../../actions/ActionType';

const defaultState = {
  preTestDate: {},
};

const levelXptForm = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.levelXpt.form.showErrors:
    case actions.report.student.levelXpt.form.update: {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case actions.report.student.levelXpt.form.clear:
      return { ...defaultState };
    default:
      return state;
  }
};

export default levelXptForm;
