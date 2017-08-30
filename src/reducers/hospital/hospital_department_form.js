const defaultState = {
  id: {},
  department: {},
  quota: {},
};

const hospitalDepartmentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_DEPARTMENT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_HOSPITAL_DEPARTMENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_HOSPITAL_DEPARTMENT': {
      return action.payload;
    }
    case 'CLEAR_HOSPITAL_DEPARTMENT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default hospitalDepartmentForm;
