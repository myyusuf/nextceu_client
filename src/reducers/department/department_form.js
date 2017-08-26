const defaultState = {
  id: {},
  code: {},
  name: {},
  level: {},
  duration: {},
  duration1: {},
  duration2: {},
  duration3: {},
  color: {},
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
