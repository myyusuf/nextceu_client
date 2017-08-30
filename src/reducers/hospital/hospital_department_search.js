const defaultState = {
  loading: false,
};

const hospitalDepartmentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_DEPARTMENT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'HOSPITAL_DEPARTMENT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default hospitalDepartmentSearch;
