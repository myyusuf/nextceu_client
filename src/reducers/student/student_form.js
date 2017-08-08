const defaultState = {
  oldSid: {},
  newSid: {},
  name: {},
  level: {},
  email: {},
};

const studentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_USER_FORM_VALIDATION_ERRORS':
    case 'UPDATE_STUDENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_STUDENT_FORM': {
      const newState = { };
      for (let i = 0; i < action.payload.length; i += 1) {
        const payload = action.payload[i];
        newState[payload.name] = {
          value: payload.value,
          validateStatus: payload.validateStatus,
          errorMsg: payload.errorMsg,
        };
      }
      return newState;
    }
    case 'CLEAR_ADD_STUDENT_FORM':
      return defaultState;
    default:
      return state;
  }
};

export default studentForm;
