import { connect } from 'react-redux';
import StudentCourseReport from '../../../components/report/student/StudentCourseReport';

const mapStateToProps = state => (
  {
    completedCourses: state.reportReducers.completedCourses.rows,
    count: state.reportReducers.completedCourses.count,
    searchText: state.reportReducers.completedCourseSearch.searchText,
    pageSize: state.reportReducers.completedCourseSearch.pageSize,
    currentPage: state.reportReducers.completedCourseSearch.currentPage,
    loading: state.reportReducers.completedCourseSearch.loading,
    dateRange: state.reportReducers.completedCourseSearch.dateRange,
    selectedRowKeys: state.reportReducers.completedCourseSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCourses: () => {
      dispatch({
        type: 'FETCH_COMPLETED_COURSES_LOGIC',
      });
    },
    openExportWindow: () => (
      dispatch({
        type: 'PREP_EXPORT_TO_PRE_TEST_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'COMPLETED_COURSE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'COMPLETED_COURSE_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: 'COMPLETED_COURSE_SEARCH_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: 'COMPLETED_COURSE_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const InitiateCourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentCourseReport);

export default InitiateCourseListWrapper;
