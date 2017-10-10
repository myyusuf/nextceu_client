const defaultState = {
  visible: false,
  confirmLoading: false,
};

const smtWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SMT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_SMT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_SMT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_SMT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default smtWindow;
