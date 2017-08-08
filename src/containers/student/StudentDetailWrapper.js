import { connect } from 'react-redux';
import StudentDetail from '../../components/pages/student/StudentDetail';
// import { selectStudent, getStudents } from '../actions/students'

const mapStateToProps = state => {
  return {
    student: state.studentReducers.student,
  };
}

const mapDispatchToProps = dispatch => {
  return {}
}

const StudentDetailWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail)

export default StudentDetailWrapper;
