const defaultState = {
  id: {},
  code: {},
  name: {},
  hospital: {},
  department: {},
};

const docentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_DOCENT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_DOCENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_DOCENT': {
      return action.payload;
    }
    case 'CLEAR_DOCENT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default docentForm;
