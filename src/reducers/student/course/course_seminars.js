const defaultState = {
  seminars: [],
  loading: false,
};

const seminars = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE_SEMINARS_SUCCESS':
      return { ...state, seminars: action.payload };
    case 'COURSE_SEMINAR_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'COURSE_SEMINAR_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default seminars;
