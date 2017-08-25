const defaultState = {
  id: {},
  code: {},
  name: {},
};

const hospitalForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_FORM_VALIDATION_ERRORS':
    case 'UPDATE_HOSPITAL_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_HOSPITAL': {
      return action.payload;
    }
    case 'CLEAR_HOSPITAL_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default hospitalForm;
