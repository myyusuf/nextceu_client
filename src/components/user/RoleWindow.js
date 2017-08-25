import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import RoleForm from './RoleForm';

const RoleWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Role"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
  >
    <RoleForm />
  </Modal>
);

RoleWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.roleReducers.roleWindow.visible,
    confirmLoading: state.roleReducers.roleWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_ADD_ROLE_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_ROLE_LOGIC',
      });
    },
  }
);

const RoleWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleWindow);

export default RoleWindowWrapper;
