import * as actions from '../../../actions/ActionType';

const defaultState = {
  visible: false,
  confirmLoading: false,
};

const assistanceXptWindow = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.assistanceXpt.window.open: {
      return { ...state, visible: true };
    }
    case actions.report.student.assistanceXpt.window.close: {
      return { ...state, visible: false };
    }
    case actions.report.student.assistanceXpt.window.startLoading: {
      return { ...state, confirmLoading: true };
    }
    case actions.report.student.assistanceXpt.window.finishLoading: {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default assistanceXptWindow;
