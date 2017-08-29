const defaultState = {
  confirmLoading: false,
};

const hospitalModalWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_CONTAINER_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_HOSPITAL_CONTAINER_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default hospitalModalWindow;
