import { connect } from 'react-redux';
import AddStudentForm from '../components/pages/student/AddStudentForm';
import { studentFormChanged } from '../actions/student_form';

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

const AddStudentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentForm);

export default AddStudentFormContainer;
