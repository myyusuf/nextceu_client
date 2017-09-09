import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import AppPropForm from './AppPropForm';

const AppPropWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Application Properties"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <AppPropForm />
  </Modal>
);

AppPropWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.settingsReducers.appPropWindow.visible,
    confirmLoading: state.settingsReducers.appPropWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_APP_PROP_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_APP_PROP_LOGIC',
      });
    },
  }
);

const AppPropWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPropWindow);

export default AppPropWindowWrapper;
