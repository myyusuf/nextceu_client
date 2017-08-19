import { connect } from 'react-redux';
import StudentDetail from '../../components/pages/student/StudentDetail';
import { deleteStudent } from '../../actions/student/students';

const mapStateToProps = state => (
  {
    student: state.studentReducers.student,
  }
);

const mapDispatchToProps = dispatch => (
  {
    deleteStudent: student => dispatch(deleteStudent(student)),
  }
);

const StudentDetailWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentDetail);

export default StudentDetailWrapper;
