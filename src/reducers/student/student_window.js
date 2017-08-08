const defaultState = {
  visible: false,
  confirmLoading: false,
};

const studentWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ADD_STUDENT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_ADD_STUDENT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_STUDENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_STUDENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default studentWindow;
