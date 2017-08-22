const defaultState = {
  title: '',
  visible: false,
  confirmLoading: false,
};

const courseWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_WINDOW': {
      return { ...state, visible: true, title: action.payload.title };
    }
    case 'HIDE_COURSE_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_COURSE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_COURSE_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default courseWindow;
