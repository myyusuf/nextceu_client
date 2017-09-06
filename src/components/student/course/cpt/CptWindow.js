import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import CptForm from './CptForm';

const CptWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Course Problem Type"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <CptForm />
  </Modal>
);

CptWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.cptWindow.visible,
    confirmLoading: state.studentReducers.cptWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_CPT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_CPT_LOGIC',
      });
    },
  }
);

const CptWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CptWindow);

export default CptWindowWrapper;
