import { connect } from 'react-redux';
import StudentList from '../../components/student/StudentList';
import { selectStudent, getStudents } from '../../actions/student/students';
import { fetchStudent, cancelFetchStudent } from '../../actions/student/student';
import { fetchCourses, cancelFetchCourses } from '../../actions/student/courses';

const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
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

const StudentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentList);

export default StudentListWrapper;
