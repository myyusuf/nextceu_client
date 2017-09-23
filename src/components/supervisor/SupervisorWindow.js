import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import SupervisorForm from './SupervisorForm';

const SupervisorWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Supervisor"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    width={400}
  >
    <SupervisorForm />
  </Modal>
);

SupervisorWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.supervisorReducers.supervisorWindow.visible,
    confirmLoading: state.supervisorReducers.supervisorWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_SUPERVISOR_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_SUPERVISOR_LOGIC',
      });
    },
  }
);

const SupervisorWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupervisorWindow);

export default SupervisorWindowWrapper;
