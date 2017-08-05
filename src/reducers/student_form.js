const defaultState = {
  email: {},
  password: {},
};

const studentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_FORM':
      const newState = { ...state };
      newState[action.payload.fieldName] = {
        value: action.payload.value,
        validateStatus: action.payload.validateStatus,
        errorMsg: action.payload.errorMsg,
      };
      return newState;
    default:
      return state;
  }
};

export default studentForm;
