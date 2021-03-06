import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import DepartmentForm from './DepartmentForm';

const DepartmentWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Department"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    wrapClassName="vertical-center-modal"
  >
    <DepartmentForm />
  </Modal>
);

DepartmentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.departmentReducers.departmentWindow.visible,
    confirmLoading: state.departmentReducers.departmentWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_DEPARTMENT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_DEPARTMENT_LOGIC',
      });
    },
  }
);

const DepartmentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentWindow);

export default DepartmentWindowWrapper;
