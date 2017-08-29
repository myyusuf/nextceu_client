const defaultState = {
  searchText: '',
  hospitalType: '1',
  hospitalDepartment: null,
  hospitalDateRange: [],
  loading: false,
};

const hospitalSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_SEARCH_DEPARTMENT_CHANGED': {
      return { ...state, hospitalDepartment: action.payload };
    }
    case 'HOSPITAL_SEARCH_DATE_RANGE_CHANGED': {
      return { ...state, hospitalDateRange: action.payload };
    }
    case 'HOSPITAL_SEARCH_TYPE_CHANGED': {
      return { ...state, hospitalType: action.payload };
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
