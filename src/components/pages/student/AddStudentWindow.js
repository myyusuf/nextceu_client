import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import StudentFormContainer from '../../../containers/StudentFormContainer';

class AddStudentWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      studentForm: {},
    };
  }

  handleOk = () => {
    this.props.onSaveSucess();
  }

  handleCancel = () => {
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
};

export default AddStudentWindow;
