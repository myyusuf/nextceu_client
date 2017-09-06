const defaultState = {
  visible: false,
  confirmLoading: false,
};

const cptWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_CPT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_CPT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_CPT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_CPT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default cptWindow;
