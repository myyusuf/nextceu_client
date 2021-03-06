const defaultState = {
  visible: false,
  confirmLoading: false,
};

const departmentWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_DEPARTMENT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_DEPARTMENT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_DEPARTMENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_DEPARTMENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default departmentWindow;
