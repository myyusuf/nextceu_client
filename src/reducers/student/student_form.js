const defaultState = {
  id: {},
  oldSid: {},
  newSid: {},
  name: {},
  level: {},
  email: {},
};

const studentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_USER_FORM_VALIDATION_ERRORS':
    case 'UPDATE_STUDENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_STUDENT': {
      return action.payload;
    }
    case 'CLEAR_ADD_STUDENT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default studentForm;