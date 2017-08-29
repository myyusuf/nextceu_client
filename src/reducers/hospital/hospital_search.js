const defaultState = {
  searchText: '',
  hospitalType: 1,
  loading: false,
};

const hospitalSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_SEARCH_TYPE_CHANGED': {
      return { ...state, hospitalType: action.payload };
    }
    case 'HOSPITAL_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'HOSPITAL_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'HOSPITAL_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default hospitalSearch;
