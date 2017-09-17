const defaultState = {
  visible: false,
  confirmLoading: false,
};

const pengampuWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PENGAMPU_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_PENGAMPU_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_PENGAMPU_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_PENGAMPU_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default pengampuWindow;
