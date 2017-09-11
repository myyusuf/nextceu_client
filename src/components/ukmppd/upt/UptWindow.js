import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import UptForm from './UptForm';

const UptWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="UKMPPD Score Type"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <UptForm />
  </Modal>
);

UptWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.ukmppdReducers.uptWindow.visible,
    confirmLoading: state.ukmppdReducers.uptWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_UPT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_UPT_LOGIC',
      });
    },
  }
);

const UptWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UptWindow);

export default UptWindowWrapper;
