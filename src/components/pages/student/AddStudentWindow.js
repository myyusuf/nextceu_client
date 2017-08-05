import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import StudentFormContainer from '../../../containers/StudentFormContainer';
import { resetStudentForm, createStudent } from '../../../actions/student_form';

class AddStudentWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      studentForm: {},
    };
  }

  handleOk = () => {
    this.props.createStudent(this.props.studentForm);
    // this.props.onSaveSucess();
  }

  handleCancel = () => {
    this.props.resetStudentForm();
    this.props.onCancel();
  }

  render() {
    return (
      <Modal
        title="Add Student"
        visible={this.props.visible}
        okText="Save"
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        cancelText="Cancel"
        onCancel={this.handleCancel}
      >
        <StudentFormContainer />
      </Modal>
    );
  }
}

AddStudentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSaveSucess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  createStudent: PropTypes.func.isRequired,
  resetStudentForm: PropTypes.func.isRequired,
  studentForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    studentForm: state.studentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    resetStudentForm: () => {
      dispatch(resetStudentForm());
    },
    createStudent: (studentForm) => {
      dispatch(createStudent(studentForm));
    },
  }
);

const AddStudentWindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentWindow);

export default AddStudentWindowContainer;
