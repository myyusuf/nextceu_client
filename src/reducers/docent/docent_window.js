const defaultState = {
  visible: false,
  confirmLoading: false,
};

const docentWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_DOCENT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_DOCENT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_DOCENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_DOCENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default docentWindow;
