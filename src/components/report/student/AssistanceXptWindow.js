import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import AssistanceXptForm from './AssistanceXptForm';
import * as actions from '../../../actions/ActionType';

const AssistanceXptWindow = ({
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
    <AssistanceXptForm />
  </Modal>
);

AssistanceXptWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.reportReducers.assistanceXptWindow.visible,
    confirmLoading: state.reportReducers.assistanceXptWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: actions.report.student.assistanceXpt.form.clear,
      });
      dispatch({
        type: actions.report.student.assistanceXpt.window.close,
      });
    },
    onOk: () => {
      dispatch({
        type: actions.report.student.assistanceXpt.doExport,
      });
    },
  }
);

const AssistanceXptWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssistanceXptWindow);

export default AssistanceXptWindowWrapper;
