const defaultState = {
  visible: false,
  confirmLoading: false,
};

const appPropWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_APP_PROP_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_APP_PROP_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_APP_PROP_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_APP_PROP_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default appPropWindow;
