const defaultState = {
  searchText: '',
  searchHospital: undefined,
  searchDepartment: undefined,
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const docentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'DOCENT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'DOCENT_SEARCH_HOSPITAL_CHANGED': {
      return { ...state, searchHospital: action.payload };
    }
    case 'DOCENT_SEARCH_DEPARTMENT_CHANGED': {
      return { ...state, searchDepartment: action.payload };
    }
    case 'DOCENT_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'DOCENT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'DOCENT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default docentSearch;
