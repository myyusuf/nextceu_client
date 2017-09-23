const defaultState = {
  id: {},
  code: {},
  name: {},
};

const supervisorForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SUPERVISOR_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SUPERVISOR_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SUPERVISOR': {
      return action.payload;
    }
    case 'CLEAR_SUPERVISOR_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default supervisorForm;
