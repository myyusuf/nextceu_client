const defaultState = {
  confirmLoading: false,
};

const loginFormContainer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_FORM_CONTAINER_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_LOGIN_FORM_CONTAINER_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default loginFormContainer;
