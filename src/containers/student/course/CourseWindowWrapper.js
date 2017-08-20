import { connect } from 'react-redux';
import CourseWindow from '../../../components/student/course/CourseWindow';
import { saveCourseForm } from '../../../actions/student/course/course_form';
import { closeCourseWindow } from '../../../actions/student/course/course_window';

const mapStateToProps = state => (
  {
    visible: state.studentReducers.courseWindow.visible,
    confirmLoading: state.studentReducers.courseWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch(closeCourseWindow());
    },
    onOk: () => {
      dispatch(saveCourseForm());
    },
  }
);

const CourseWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseWindow);

export default CourseWindowWrapper;
