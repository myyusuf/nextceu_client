const defaultState = {
  assistances: [],
  loading: false,
};

const studentAssistances = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_STUDENT_ASSISTANCES_SUCCESS':
      return { ...state, assistances: action.payload };
    case 'STUDENT_ASSISTANCE_LOADING_START': {
      return { ...state, loading: true, assistances: [...state.assistances] };
    }
    case 'STUDENT_ASSISTANCE_LOADING_FINISH': {
      return { ...state, loading: false, assistances: [...state.assistances] };
    }
    default:
      return state;
  }
};

export default studentAssistances;
