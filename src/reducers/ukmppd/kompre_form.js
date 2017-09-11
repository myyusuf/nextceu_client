const defaultState = {
  id: {},
  score: {},
  kompreType: {},
  kompreDate: {},
  selected: {},
};

const kompreForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_KOMPRE_FORM_VALIDATION_ERRORS':
    case 'UPDATE_KOMPRE_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_KOMPRE': {
      return action.payload;
    }
    case 'CLEAR_KOMPRE_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default kompreForm;
