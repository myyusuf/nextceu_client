import { connect } from 'react-redux';
import StudentList from '../components/pages/student/StudentList';
import { selectStudent, getStudents } from '../actions/students';
import { fetchStudent, cancelFetchStudent } from '../actions/student';
import { fetchCourses, cancelFetchCourses } from '../actions/courses';

const mapStateToProps = state => (
  {
    students: state.students,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onItemClick: (student) => {
      dispatch(selectStudent(student));

      dispatch(cancelFetchStudent());
      dispatch(fetchStudent(student.id));

      dispatch(cancelFetchCourses());
      dispatch(fetchCourses(student.id));
    },
    getStudents: () => {
      dispatch(getStudents());
    },
  }
);

const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentList);

export default StudentListContainer;
