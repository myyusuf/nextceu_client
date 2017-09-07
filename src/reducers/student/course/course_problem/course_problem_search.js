const defaultState = {
  searchText: '',
  loading: false,
};

const courseProblemSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'COURSE_PROBLEM_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'COURSE_PROBLEM_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'COURSE_PROBLEM_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default courseProblemSearch;
