import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import StudentForm from './StudentForm';

const StudentWindow = ({ visible, onOk, onCancel, confirmLoading }) => (
  <Modal
    title="Add Student"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    wrapClassName="vertical-center-modal"
    width={610}
  >
    <StudentForm />
  </Modal>
);

StudentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.studentWindow.visible,
    confirmLoading: state.studentReducers.studentWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_STUDENT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_STUDENT_LOGIC',
      });
    },
  }
);

const StudentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentWindow);

export default StudentWindowWrapper;
