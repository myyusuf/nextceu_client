const defaultState = {
  preTestDate: {},
};

const exportToPreTestForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_EXPORT_TO_PRE_TEST_FORM_VALIDATION_ERRORS':
    case 'UPDATE_EXPORT_TO_PRE_TEST_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_EXPORT_TO_PRE_TEST': {
      return action.payload;
    }
    case 'CLEAR_EXPORT_TO_PRE_TEST_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default exportToPreTestForm;
