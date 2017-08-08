import { connect } from 'react-redux';
import AddStudentForm from '../../components/pages/student/AddStudentForm';
import { studentFormChanged } from '../../actions/student/student_form';

const mapStateToProps = state => (
  {
    studentForm: state.studentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    studentFormChanged: (value) => {
      dispatch(studentFormChanged(value));
    },
  }
);

const AddStudentFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentForm);

export default AddStudentFormWrapper;
