import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import CourseFormWrapper from '../../../containers/student/course/CourseFormWrapper';

const CourseWindow = ({ title, visible, onOk, onCancel, confirmLoading }) => (
  <Modal
    title={title}
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
  >
    <CourseFormWrapper />
  </Modal>
);

CourseWindow.propTypes = {
  title: PropTypes.bool.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

export default CourseWindow;
