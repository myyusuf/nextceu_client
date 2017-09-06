const defaultState = {
  visible: false,
  confirmLoading: false,
};

const scoreWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SCORE_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_SCORE_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_SCORE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_SCORE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default scoreWindow;
