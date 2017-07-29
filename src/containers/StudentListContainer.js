import { connect } from 'react-redux';
import StudentList from '../components/pages/student/StudentList';
import { selectStudent, getStudents } from '../actions/students'

import store from '../store';

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

store.dispatch(getStudents());

export default StudentListContainer;

