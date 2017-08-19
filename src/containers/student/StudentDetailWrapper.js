import { connect } from 'react-redux';
import StudentDetail from '../../components/student/StudentDetail';
import { deleteStudent, editStudent } from '../../actions/student/students';

const mapStateToProps = state => (
  {
    student: state.studentReducers.student,
  }
);

const mapDispatchToProps = dispatch => (
  {
    editStudent: student => dispatch(editStudent(student)),
    deleteStudent: student => dispatch(deleteStudent(student)),
  }
);

const StudentDetailWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentDetail);

export default StudentDetailWrapper;
