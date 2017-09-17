const defaultState = {
  id: {},
  code: {},
  name: {},
  department: {},
  active: { value: true },
};

const sgtForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SGT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SGT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SGT': {
      return action.payload;
    }
    case 'CLEAR_SGT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default sgtForm;
