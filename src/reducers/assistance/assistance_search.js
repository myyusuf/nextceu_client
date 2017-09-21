import moment from 'moment';

const getInitialDateRange = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  return [moment(firstDay), moment(lastDay)];
};

const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateRange: getInitialDateRange(),
};

const assistanceSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'ASSISTANCE_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'ASSISTANCE_SEARCH_DATE_RANGE_CHANGED': {
      return { ...state, dateRange: action.payload };
    }
    case 'ASSISTANCE_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'ASSISTANCE_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'ASSISTANCE_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default assistanceSearch;
