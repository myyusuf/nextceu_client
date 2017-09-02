const defaultState = {
  id: {},
  username: { value: '' },
  password: {},
};

const loginForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_FORM_VALIDATION_ERRORS':
    case 'UPDATE_LOGIN_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_LOGIN': {
      return action.payload;
    }
    case 'CLEAR_LOGIN_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default loginForm;
