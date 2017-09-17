const defaultState = {
  visible: false,
  confirmLoading: false,
};

const sgtWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SGT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_SGT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_SGT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_SGT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default sgtWindow;
