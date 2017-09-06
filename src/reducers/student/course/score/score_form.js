const defaultState = {
  id: {},
  scoreValue: {},
  scoreType: {},
  scoreDate: {},
};

const scoreForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SCORE_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SCORE_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SCORE': {
      return action.payload;
    }
    case 'CLEAR_SCORE_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default scoreForm;
