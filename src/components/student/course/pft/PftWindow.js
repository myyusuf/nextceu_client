import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import PftForm from './PftForm';

const PftWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Portofolio Type"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <PftForm />
  </Modal>
);

PftWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.pftWindow.visible,
    confirmLoading: state.studentReducers.pftWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_PFT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_PFT_LOGIC',
      });
    },
  }
);

const PftWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PftWindow);

export default PftWindowWrapper;
