import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import DocentForm from './DocentForm';

const DocentWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Docent"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <DocentForm />
  </Modal>
);

DocentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.docentReducers.docentWindow.visible,
    confirmLoading: state.docentReducers.docentWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_DOCENT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_DOCENT_LOGIC',
      });
    },
  }
);

const DocentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocentWindow);

export default DocentWindowWrapper;
