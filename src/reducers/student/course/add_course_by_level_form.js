const defaultState = {
  level: {},
  startDate: {},
  suffix: {},
};

const addCourseByLevelForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ADD_COURSE_BY_LEVEL_FORM_VALIDATION_ERRORS':
    case 'UPDATE_ADD_COURSE_BY_LEVEL_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_ADD_COURSE_BY_LEVEL': {
      return action.payload;
    }
    case 'CLEAR_ADD_COURSE_BY_LEVEL_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default addCourseByLevelForm;
