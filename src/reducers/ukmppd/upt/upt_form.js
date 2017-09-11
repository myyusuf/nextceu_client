const defaultState = {
  id: {},
  code: {},
  name: {},
};

const uptForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_UPT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_UPT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_UPT': {
      return action.payload;
    }
    case 'CLEAR_UPT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default uptForm;
