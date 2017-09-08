const defaultState = {
  id: {},
  portofolioType: {},
  portofolioDate: {},
  completed: {},
};

const portofolioForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_PORTOFOLIO_FORM_VALIDATION_ERRORS':
    case 'UPDATE_PORTOFOLIO_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_PORTOFOLIO': {
      return action.payload;
    }
    case 'CLEAR_PORTOFOLIO_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default portofolioForm;
