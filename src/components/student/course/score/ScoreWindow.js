import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import ScoreForm from './ScoreForm';

const ScoreWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Score"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    width={400}
  >
    <ScoreForm />
  </Modal>
);

ScoreWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.scoreWindow.visible,
    confirmLoading: state.studentReducers.scoreWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_SCORE_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_SCORE_LOGIC',
      });
    },
  }
);

const ScoreWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreWindow);

export default ScoreWindowWrapper;
