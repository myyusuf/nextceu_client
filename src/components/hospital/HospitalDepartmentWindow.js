import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import HospitalDepartmentForm from './HospitalDepartmentForm';

const HospitalDepartmentWindow = ({
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
  >
    <HospitalDepartmentForm />
  </Modal>
);

HospitalDepartmentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.hospitalReducers.hospitalDepartmentWindow.visible,
    confirmLoading: state.hospitalReducers.hospitalDepartmentWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_HOSPITAL_DEPARTMENT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_DEPARTMENT_LOGIC',
      });
    },
  }
);

const HospitalDepartmentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalDepartmentWindow);

export default HospitalDepartmentWindowWrapper;
