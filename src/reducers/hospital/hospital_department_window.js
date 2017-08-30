const defaultState = {
  visible: false,
  confirmLoading: false,
};

const hospitalDepartmentWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_DEPARTMENT_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_HOSPITAL_DEPARTMENT_WINDOW': {
      return { ...state, visible: false };
    }
    case 'SHOW_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: true };
    }
    case 'HIDE_HOSPITAL_DEPARTMENT_WINDOW_CONFIRM_LOADING': {
      return { ...state, confirmLoading: false };
    }
    default:
      return state;
  }
};

export default hospitalDepartmentWindow;
