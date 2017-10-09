import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import SmtForm from './SmtForm';

const SmtWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Seminar Type"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <SmtForm />
  </Modal>
);

SmtWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.seminarReducers.smtWindow.visible,
    confirmLoading: state.seminarReducers.smtWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_SMT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_SMT_LOGIC',
      });
    },
  }
);

const SmtWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmtWindow);

export default SmtWindowWrapper;
