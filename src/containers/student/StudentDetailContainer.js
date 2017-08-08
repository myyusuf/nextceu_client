import { connect } from 'react-redux';
import StudentDetail from '../components/pages/student/StudentDetail';
// import { selectStudent, getStudents } from '../actions/students'

const mapStateToProps = state => {
  return {
    student: state.student,
  };
}

const mapDispatchToProps = dispatch => {
  return {}
}

const StudentDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail)

export default StudentDetailContainer;

