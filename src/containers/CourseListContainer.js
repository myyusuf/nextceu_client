import { connect } from 'react-redux';
import CourseList from '../components/pages/student/course/CourseList';
import { selectCourse, getCourses } from '../actions/courses';
// import { getCourse } from '../actions/course';

const mapStateToProps = state => {
  return {
    courses: state.courses,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: (course) => {
      dispatch(selectCourse(course));
      // dispatch(getCourse(course.id));
    },
    getCourses: () => {
      dispatch(getCourses());
    },
  };
};

const CourseListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseList);

export default CourseListContainer;
