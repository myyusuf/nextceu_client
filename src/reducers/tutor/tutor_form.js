const defaultState = {
  id: {},
  code: {},
  name: {},
};

const tutorForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_TUTOR_FORM_VALIDATION_ERRORS':
    case 'UPDATE_TUTOR_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_TUTOR': {
      return action.payload;
    }
    case 'CLEAR_TUTOR_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default tutorForm;
