const defaultState = {
  id: {},
  sglType: {},
  sglDate: {},
  completed: {},
};

const sglForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SGL_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SGL_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SGL': {
      return action.payload;
    }
    case 'CLEAR_SGL_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default sglForm;
