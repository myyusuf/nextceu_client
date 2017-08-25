import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import HospitalForm from './HospitalForm';

const HospitalModalWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Hospital"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
  >
    <HospitalForm />
  </Modal>
);

HospitalModalWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.hospitalReducers.hospitalModalWindow.visible,
    confirmLoading: state.hospitalReducers.hospitalModalWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_ADD_HOSPITAL_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_LOGIC',
      });
    },
  }
);

const HospitalModalWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalModalWindow);

export default HospitalModalWindowWrapper;
