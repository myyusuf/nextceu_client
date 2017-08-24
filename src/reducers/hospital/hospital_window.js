const defaultState = {
  confirmLoading: false,
};

const hospitalWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_HOSPITAL_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default hospitalWindow;
