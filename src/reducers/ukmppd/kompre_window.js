const defaultState = {
  visible: false,
  confirmLoading: false,
};

const kompreWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_KOMPRE_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_KOMPRE_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_KOMPRE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_KOMPRE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default kompreWindow;
