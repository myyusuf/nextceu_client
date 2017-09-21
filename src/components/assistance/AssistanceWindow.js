import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import AssistanceForm from './AssistanceForm';

const AssistanceWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Assistance"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <AssistanceForm />
  </Modal>
);

AssistanceWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.assistanceReducers.assistanceWindow.visible,
    confirmLoading: state.assistanceReducers.assistanceWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_ASSISTANCE_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_ASSISTANCE_LOGIC',
      });
    },
  }
);

const AssistanceWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssistanceWindow);

export default AssistanceWindowWrapper;
