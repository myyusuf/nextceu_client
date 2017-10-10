const defaultState = {
  id: {},
  code: {},
  name: {},
  department: {},
  active: { value: true },
};

const smtForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SMT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SMT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SMT': {
      return action.payload;
    }
    case 'CLEAR_SMT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default smtForm;
