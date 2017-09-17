const defaultState = {
  id: {},
  code: {},
  name: {},
  department: {},
};

const pengampuForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PENGAMPU_FORM_VALIDATION_ERRORS':
    case 'UPDATE_PENGAMPU_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_PENGAMPU': {
      return action.payload;
    }
    case 'CLEAR_PENGAMPU_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default pengampuForm;
