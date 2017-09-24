import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import LevelXptForm from './LevelXptForm';
import * as actions from '../../../actions/ActionType';

const LevelXptWindow = ({
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
    <LevelXptForm />
  </Modal>
);

LevelXptWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.reportReducers.levelXptWindow.visible,
    confirmLoading: state.reportReducers.levelXptWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: actions.report.student.levelXpt.form.clear,
      });
      dispatch({
        type: actions.report.student.levelXpt.window.close,
      });
    },
    onOk: () => {
      dispatch({
        type: actions.report.student.levelXpt.doExport,
      });
    },
  }
);

const LevelXptWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelXptWindow);

export default LevelXptWindowWrapper;
