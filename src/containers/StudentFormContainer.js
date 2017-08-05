import { connect } from 'react-redux';
import AddStudentForm from '../components/pages/student/AddStudentForm';
import { updateStudentForm } from '../actions/student_form';

const mapStateToProps = state => (
  {
    studentForm: state.studentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    updateStudentForm: (value) => {
      dispatch(updateStudentForm(value));
    },
  }
);

const AddStudentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentForm);

export default AddStudentFormContainer;
