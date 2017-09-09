const defaultState = {
  id: {},
  code: {},
  name: {},
  stringValue: {},
};

const appPropForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_APP_PROP_FORM_VALIDATION_ERRORS':
    case 'UPDATE_APP_PROP_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_APP_PROP': {
      return action.payload;
    }
    case 'CLEAR_APP_PROP_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default appPropForm;
