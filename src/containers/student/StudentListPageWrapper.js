import { connect } from 'react-redux';
import { openAddStudentWindow } from '../../actions/student/student_window';
import { getStudents } from '../../actions/student/students';
import StudentListPage from '../../pages/student/StudentListPage';

const mapStateToProps = state => (
  {
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddStudentWindow: () => {
      dispatch(openAddStudentWindow());
    },
    filterStudents: filter => (
      dispatch(getStudents(filter))
    ),
  }
);

const StudentListPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentListPage);

export default StudentListPageWrapper;
