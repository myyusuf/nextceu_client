const defaultState = {
  id: {},
  code: {},
  name: {},
};

const cptForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_CPT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_CPT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_CPT': {
      return action.payload;
    }
    case 'CLEAR_CPT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default cptForm;
