const defaultState = {
  id: {},
  code: {},
  name: {},
  eventDate: {},
  speaker: {},
  moderator: {},
};

const seminarForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SEMINAR_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SEMINAR_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SEMINAR': {
      return action.payload;
    }
    case 'CLEAR_SEMINAR_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default seminarForm;
