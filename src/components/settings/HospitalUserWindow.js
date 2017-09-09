import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import HospitalUserForm from './HospitalUserForm';

const HospitalUserWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add HospitalUser"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <HospitalUserForm />
  </Modal>
);

HospitalUserWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.settingsReducers.hospitalUserWindow.visible,
    confirmLoading: state.settingsReducers.hospitalUserWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_HOSPITAL_USER_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_USER_LOGIC',
      });
    },
  }
);

const HospitalUserWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalUserWindow);

export default HospitalUserWindowWrapper;
