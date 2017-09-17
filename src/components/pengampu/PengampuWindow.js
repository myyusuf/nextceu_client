import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import PengampuForm from './PengampuForm';

const PengampuWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Pengampu"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    width={400}
  >
    <PengampuForm />
  </Modal>
);

PengampuWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.pengampuReducers.pengampuWindow.visible,
    confirmLoading: state.pengampuReducers.pengampuWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_PENGAMPU_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_PENGAMPU_LOGIC',
      });
    },
  }
);

const PengampuWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PengampuWindow);

export default PengampuWindowWrapper;
