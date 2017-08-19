import { connect } from 'react-redux';
import CoursePage from '../../components/student/course/CoursePage';

const mapStateToProps = state => (
  {
    student: state.studentReducers.student,
  }
);

const mapDispatchToProps = dispatch => (
  {
  }
);

const CoursePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoursePage);

export default CoursePageWrapper;
