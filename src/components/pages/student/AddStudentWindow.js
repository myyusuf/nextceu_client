import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import StudentFormWrapper from '../../../containers/student/AddStudentFormWrapper';

const AddStudentWindow = ({ visible, onOk, onCancel, confirmLoading }) => (
  <Modal
    title="Add Student"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
  >
    <StudentFormWrapper />
  </Modal>
);

AddStudentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

export default AddStudentWindow;
