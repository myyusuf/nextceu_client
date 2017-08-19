import { connect } from 'react-redux';
import AddStudentWindow from '../../components/student/AddStudentWindow';
import { saveStudentForm } from '../../actions/student/student_form';
import { closeAddStudentWindow } from '../../actions/student/student_window';

const mapStateToProps = state => (
  {
    visible: state.studentReducers.studentWindow.visible,
    confirmLoading: state.studentReducers.studentWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch(closeAddStudentWindow());
    },
    onOk: () => {
      dispatch(saveStudentForm());
    },
  }
);

const AddStudentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentWindow);

export default AddStudentWindowWrapper;
