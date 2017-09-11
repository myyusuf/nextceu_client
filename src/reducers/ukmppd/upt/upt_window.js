const defaultState = {
  visible: false,
  confirmLoading: false,
};

const uptWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_UPT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_UPT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_UPT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_UPT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default uptWindow;
