const defaultState = {
  id: {},
  planDate: {},
};

const scheduleForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SCHEDULE_FORM_VALIDATION_ERRORS':
    case 'UPDATE_SCHEDULE_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_SCHEDULE': {
      return action.payload;
    }
    case 'CLEAR_SCHEDULE_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default scheduleForm;
