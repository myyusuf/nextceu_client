import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import InitiateXptForm from './InitiateXptForm';
import * as actions from '../../../actions/ActionType';

const InitiateXptWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Export To Pre Test"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <InitiateXptForm />
  </Modal>
);

InitiateXptWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.reportReducers.initiateXptWindow.visible,
    confirmLoading: state.reportReducers.initiateXptWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: actions.report.student.initiateXpt.form.clear,
      });
      dispatch({
        type: actions.report.student.initiateXpt.window.close,
      });
    },
    onOk: () => {
      dispatch({
        type: actions.report.student.initiateXpt.doExport,
      });
    },
  }
);

const InitiateXptWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitiateXptWindow);

export default InitiateXptWindowWrapper;
