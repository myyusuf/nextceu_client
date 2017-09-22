const defaultState = {
  visible: false,
  confirmLoading: false,
};

const tutorWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_TUTOR_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_TUTOR_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_TUTOR_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_TUTOR_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default tutorWindow;
