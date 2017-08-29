import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import HospitalForm from './HospitalForm';

const HospitalWindow = ({
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
    onCancel={onCancel}
  >
    <HospitalForm />
  </Modal>
);

HospitalWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.hospitalReducers.hospitalWindow.visible,
    confirmLoading: state.hospitalReducers.hospitalWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_HOSPITAL_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_LOGIC',
      });
    },
  }
);

const HospitalWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalWindow);

export default HospitalWindowWrapper;
