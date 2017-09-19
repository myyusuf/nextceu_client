import * as actions from '../../actions/ActionType';

const defaultState = {
  visible: false,
  confirmLoading: false,
};

const yudisiumWindow = (state = defaultState, action) => {
  switch (action.type) {
    case actions.yudisium.yudisiumWindow.open: {
      return { ...state, visible: true };
    }
    case actions.yudisium.yudisiumWindow.close: {
      return { ...state, visible: false };
    }
    case actions.yudisium.yudisiumWindow.loadingStart: {
      return { ...state, confirmLoading: true };
    }
    case actions.yudisium.yudisiumWindow.loadingFinish: {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default yudisiumWindow;
