import { connect } from 'react-redux';
import AddStudentWindow from '../../components/pages/student/AddStudentWindow';
import { closeAddStudentWindow } from '../../actions/student/student_window';

const mapStateToProps = state => (
  {
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
