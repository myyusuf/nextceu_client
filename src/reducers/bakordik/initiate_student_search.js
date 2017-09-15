import * as actions from '../../actions/ActionType';

const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateRange: [],
};

const initiateStudentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case actions.bakordik.initiateStudent.list.search.textChanged: {
      return { ...state, searchText: action.payload };
    }
    case actions.bakordik.initiateStudent.list.search.dateRangeChanged: {
      return { ...state, dateRange: action.payload };
    }
    case actions.bakordik.initiateStudent.list.search.pageChanged: {
      return { ...state, currentPage: action.payload };
    }
    case actions.bakordik.initiateStudent.list.loadingStart: {
      return { ...state, loading: true };
    }
    case actions.bakordik.initiateStudent.list.loadingFinish: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default initiateStudentSearch;
