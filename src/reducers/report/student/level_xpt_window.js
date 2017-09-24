import * as actions from '../../../actions/ActionType';

const defaultState = {
  visible: false,
  confirmLoading: false,
};

const levelXptWindow = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.levelXpt.window.open: {
      return { ...state, visible: true };
    }
    case actions.report.student.levelXpt.window.close: {
      return { ...state, visible: false };
    }
    case actions.report.student.levelXpt.window.startLoading: {
      return { ...state, confirmLoading: true };
    }
    case actions.report.student.levelXpt.window.finishLoading: {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default levelXptWindow;
