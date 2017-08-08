import { connect } from 'react-redux';
import CourseList from '../../components/pages/student/course/CourseList';
import { selectCourse, fetchCourses } from '../../actions/student/courses';
// import { getCourse } from '../actions/course';

const mapStateToProps = state => {
  return {
    courses: state.studentReducers.courses,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: (course) => {
      dispatch(selectCourse(course));
      // dispatch(getCourse(course.id));
    },
    fetchCourses: () => {
      dispatch(fetchCourses());
    },
  };
};

const CourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseList);

export default CourseListWrapper;
