const defaultState = {
  oldSid: {},
  newSid: {},
  name: {},
  level: {},
  email: {},
};

const studentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_FORM': {
      const newState = { ...state };
      newState[action.payload.fieldName] = {
        value: action.payload.value,
        validateStatus: action.payload.validateStatus,
        errorMsg: action.payload.errorMsg,
      };
      return newState;
    }
    case 'RESET_STUDENT_FORM':
      return defaultState;
    default:
      return state;
  }
};

export default studentForm;
