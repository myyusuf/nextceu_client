import { connect } from 'react-redux';
import StudentList from '../components/pages/student/StudentList';
import { selectStudent } from '../actions/students'

const mapStateToProps = state => {
  return {
    students: state.students,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: (student) => {
      dispatch(selectStudent(student))
    }
  }
}

const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList)

export default StudentListContainer;

