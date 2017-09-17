import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import SglForm from './SglForm';

const SglWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="SGL"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    wrapClassName="vertical-center-modal"
  >
    <SglForm />
  </Modal>
);

SglWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.sglWindow.visible,
    confirmLoading: state.studentReducers.sglWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_SGL_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_SGL_LOGIC',
      });
    },
  }
);

const SglWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SglWindow);

export default SglWindowWrapper;
