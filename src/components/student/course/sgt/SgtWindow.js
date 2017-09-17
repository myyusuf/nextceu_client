import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import SgtForm from './SgtForm';

const SgtWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="SGL Type"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <SgtForm />
  </Modal>
);

SgtWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.sgtWindow.visible,
    confirmLoading: state.studentReducers.sgtWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_SGT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_SGT_LOGIC',
      });
    },
  }
);

const SgtWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SgtWindow);

export default SgtWindowWrapper;
