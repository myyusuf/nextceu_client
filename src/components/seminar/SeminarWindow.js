import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import SeminarForm from './SeminarForm';

const SeminarWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Seminar"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    wrapClassName="vertical-center-modal"
  >
    <SeminarForm />
  </Modal>
);

SeminarWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.seminarReducers.seminarWindow.visible,
    confirmLoading: state.seminarReducers.seminarWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_SEMINAR_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_SEMINAR_LOGIC',
      });
    },
  }
);

const SeminarWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarWindow);

export default SeminarWindowWrapper;
