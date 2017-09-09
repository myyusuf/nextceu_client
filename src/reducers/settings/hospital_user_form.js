const defaultState = {
  id: {},
  user: {},
  hospital: {},
};

const hospitalUserForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_USER_FORM_VALIDATION_ERRORS':
    case 'UPDATE_HOSPITAL_USER_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_HOSPITAL_USER': {
      return action.payload;
    }
    case 'CLEAR_HOSPITAL_USER_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default hospitalUserForm;
