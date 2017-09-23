const defaultState = {
  visible: false,
  confirmLoading: false,
};

const supervisorWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SUPERVISOR_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_SUPERVISOR_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_SUPERVISOR_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_SUPERVISOR_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default supervisorWindow;
