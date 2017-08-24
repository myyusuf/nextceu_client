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
  hospitalDepartmentForm,
  hospitalDepartmentFormChanged,
}) => (
  <Modal
    title="Add Hospital Department"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
  >
    <HospitalDepartmentForm
      hospitalDepartmentForm={hospitalDepartmentForm}
      hospitalDepartmentFormChanged={hospitalDepartmentFormChanged}
    />
  </Modal>
);

HospitalDepartmentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  hospitalDepartmentForm: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  hospitalDepartmentFormChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.hospitalReducers.hospitalDepartmentlWindow.visible,
    confirmLoading: state.hospitalReducers.hospitalDepartmentlWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CLOSE_HOSPITAL_DEPARTMENT_WINDOW',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_DEPARTMENT_FORM',
      });
    },
  }
);

const HospitalDepartmentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalDepartmentWindow);

export default HospitalDepartmentWindowWrapper;
