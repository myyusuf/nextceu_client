const defaultState = {
  loading: false,
};

const hospitalStudentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_STUDENT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'HOSPITAL_STUDENT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default hospitalStudentSearch;
