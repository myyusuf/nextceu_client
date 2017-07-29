import { connect } from 'react-redux';
import StudentList from '../components/pages/student/StudentList';
import { selectStudent, getStudents } from '../actions/students'

const mapStateToProps = state => {
  return {
    students: state.students,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: (student) => {
      dispatch(selectStudent(student))
    },
    getStudents: () => {
      dispatch(getStudents());
    }
  }
}

const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList)

export default StudentListContainer;

