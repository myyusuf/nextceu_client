const defaultState = {
  department: {},
  startDate: {},
  title: {},
};

const addCourseByDepartmentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_ADD_COURSE_BY_DEPARTMENT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_ADD_COURSE_BY_DEPARTMENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_ADD_COURSE_BY_DEPARTMENT': {
      return action.payload;
    }
    case 'CLEAR_ADD_COURSE_BY_DEPARTMENT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default addCourseByDepartmentForm;
