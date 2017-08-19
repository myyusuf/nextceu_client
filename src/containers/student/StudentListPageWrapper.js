import { connect } from 'react-redux';
import { openAddStudentWindow } from '../../actions/student/student_window';
import { filterStudentsBySearchText } from '../../actions/student/students';
import StudentListPage from '../../pages/student/StudentListPage';

const mapStateToProps = state => (
  {
    studentFilter: state.studentReducers.studentFilter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddStudentWindow: () => {
      dispatch(openAddStudentWindow());
    },
    filterStudents: filter => (
      dispatch(filterStudentsBySearchText(filter))
    ),
  }
);

const StudentListPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentListPage);

export default StudentListPageWrapper;
