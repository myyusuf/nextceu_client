import { connect } from 'react-redux';
import CourseList from '../../components/student/course/CourseList';
import { fetchCourses } from '../../actions/student/courses';
import { editCourse } from '../../actions/student/course/course';

const mapStateToProps = state => (
  {
    courses: state.studentReducers.courses,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCourses: () => {
      dispatch(fetchCourses());
    },
    showDetails: (course) => {
      dispatch(editCourse(course));
    },
  }
);

const CourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseList);

export default CourseListWrapper;
