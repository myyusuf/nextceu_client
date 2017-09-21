const defaultState = {
  visible: false,
  confirmLoading: false,
};

const assistanceWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ASSISTANCE_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_ASSISTANCE_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_ASSISTANCE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_ASSISTANCE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default assistanceWindow;
