const defaultState = {
  visible: false,
  confirmLoading: false,
};

const portofolioWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PORTOFOLIO_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_PORTOFOLIO_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_PORTOFOLIO_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_PORTOFOLIO_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default portofolioWindow;
