import { connect } from 'react-redux';
import InitiateCourseReport from '../../../components/report/student/InitiateCourseReport';

const mapStateToProps = state => (
  {
    courses: state.reportReducers.initiateCourses.rows,
    count: state.reportReducers.initiateCourses.count,
    searchText: state.reportReducers.initiateCourseSearch.searchText,
    pageSize: state.reportReducers.initiateCourseSearch.pageSize,
    currentPage: state.reportReducers.initiateCourseSearch.currentPage,
    loading: state.reportReducers.initiateCourseSearch.loading,
    dateRange: state.reportReducers.initiateCourseSearch.dateRange,
    selectedRowKeys: state.reportReducers.initiateCourseSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCourses: () => {
      dispatch({
        type: 'FETCH_INITIATE_COURSES_LOGIC',
      });
    },
    openExportWindow: () => (
      dispatch({
        type: 'PREP_EXPORT_TO_PRE_TEST_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'INITIATE_COURSE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'INITIATE_COURSE_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: 'INITIATE_COURSE_SEARCH_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: 'INITIATE_COURSE_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const InitiateCourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitiateCourseReport);

export default InitiateCourseListWrapper;
