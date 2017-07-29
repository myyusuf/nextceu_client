import { connect } from 'react-redux';
import StudentList from '../components/pages/student/StudentList';
import { selectStudent, getStudents } from '../actions/students';
import { getStudent } from '../actions/student';

const mapStateToProps = state => {
  return {
    students: state.students,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: (student) => {
      dispatch(selectStudent(student));
      dispatch(getStudent(student.id));
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

