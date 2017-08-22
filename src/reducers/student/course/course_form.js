const defaultState = {
  id: {},
  title: {},
  completion: { value: 0 },
};

const courseForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_FORM_VALIDATION_ERRORS':
    case 'UPDATE_COURSE_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_COURSE': {
      return action.payload;
    }
    case 'CLEAR_COURSE_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default courseForm;
