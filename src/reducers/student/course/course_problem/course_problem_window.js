const defaultState = {
  visible: false,
  confirmLoading: false,
};

const courseProblemWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_PROBLEM_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_COURSE_PROBLEM_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_COURSE_PROBLEM_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default courseProblemWindow;
