import { connect } from 'react-redux';
import AddStudentWindow from '../../components/pages/student/AddStudentWindow';
import { closeAddStudentWindow } from '../../actions/student/student_window';

const mapStateToProps = state => (
  {
    visible: state.studentReducers.studentWindow.visible,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch(closeAddStudentWindow());
    },
  }
);

const AddStudentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentWindow);

export default AddStudentWindowWrapper;
