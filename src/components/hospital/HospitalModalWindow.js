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
  code,
  name,
  hospitalFormChanged,
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
    <HospitalForm code={code} name={name} hospitalFormChanged={hospitalFormChanged} />
  </Modal>
);

HospitalModalWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hospitalFormChanged: PropTypes.func.isRequired,
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
        type: 'CLOSE_HOSPITAL_MODAL_WINDOW',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_FORM',
      });
    },
  }
);

const HospitalModalWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalModalWindow);

export default HospitalModalWindowWrapper;
