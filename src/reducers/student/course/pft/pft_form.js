const defaultState = {
  id: {},
  code: {},
  name: {},
  department: {},
};

const pftForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PFT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_PFT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_PFT': {
      return action.payload;
    }
    case 'CLEAR_PFT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default pftForm;
