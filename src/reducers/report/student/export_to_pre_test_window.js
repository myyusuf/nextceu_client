const defaultState = {
  visible: false,
  confirmLoading: false,
};

const exportToPreTestWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_EXPORT_TO_PRE_TEST_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_EXPORT_TO_PRE_TEST_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_EXPORT_TO_PRE_TEST_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_EXPORT_TO_PRE_TEST_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default exportToPreTestWindow;
