import { connect } from 'react-redux';
import CourseForm from '../../../components/student/course/CourseForm';
import { courseFormChanged } from '../../../actions/student/course/course_form';

const mapStateToProps = state => (
  {
    courseForm: state.studentReducers.courseForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    courseFormChanged: (value) => {
      dispatch(courseFormChanged(value));
    },
  }
);

const CourseFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseForm);

export default CourseFormWrapper;
