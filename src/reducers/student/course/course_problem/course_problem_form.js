const defaultState = {
  id: {},
  title: {},
  description: {},
  courseProblemType: {},
  problemDate: {},
  comment: {},
  completed: {},
};

const courseProblemForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_PROBLEM_FORM_VALIDATION_ERRORS':
    case 'UPDATE_COURSE_PROBLEM_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_COURSE_PROBLEM': {
      return action.payload;
    }
    case 'CLEAR_COURSE_PROBLEM_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default courseProblemForm;
