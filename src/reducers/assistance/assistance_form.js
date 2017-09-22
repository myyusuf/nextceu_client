const defaultState = {
  id: {},
  code: {},
  name: {},
  eventDate: {},
  eventTime: {},
  mainTutor: {},
  secondTutor: {},
  thirdTutor: {},
  facilitator: {},
  mainTutorPresent: {},
  secondTutorPresent: {},
  thirdTutorPresent: {},
  facilitatorPresent: {},
};

const assistanceForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ASSISTANCE_FORM_VALIDATION_ERRORS':
    case 'UPDATE_ASSISTANCE_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_ASSISTANCE': {
      return action.payload;
    }
    case 'CLEAR_ASSISTANCE_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default assistanceForm;
