const defaultState = {
  visible: false,
  confirmLoading: false,
};

const seminarWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SEMINAR_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_SEMINAR_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_SEMINAR_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_SEMINAR_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default seminarWindow;
