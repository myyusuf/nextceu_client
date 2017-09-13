import * as actions from '../../../actions/ActionType';

const defaultState = {
  visible: false,
  confirmLoading: false,
};

const initiateXptWindow = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.initiateXpt.window.open: {
      return { ...state, visible: true };
    }
    case actions.report.student.initiateXpt.window.close: {
      return { ...state, visible: false };
    }
    case actions.report.student.initiateXpt.window.startLoading: {
      return { ...state, confirmLoading: true };
    }
    case actions.report.student.initiateXpt.window.finishLoading: {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default initiateXptWindow;
