const defaultState = {
  id: {},
  code: {},
  name: {},
};

const departmentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_DEPARTMENT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_DEPARTMENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_DEPARTMENT': {
      return action.payload;
    }
    case 'CLEAR_DEPARTMENT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default departmentForm;