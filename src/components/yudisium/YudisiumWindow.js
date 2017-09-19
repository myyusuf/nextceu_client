import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import YudisiumChecklistForm from './YscForm';

import * as actions from '../../actions/ActionType';

const YudisiumWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Yudisium Prerequisite"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <YudisiumChecklistForm />
  </Modal>
);

YudisiumWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.yudisiumReducers.yudisiumWindow.visible,
    confirmLoading: state.yudisiumReducers.yudisiumWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: actions.yudisium.yudisiumWindow.close,
      });
    },
    onOk: () => {
      dispatch({
        type: actions.yudisium.yudisium.save,
      });
      dispatch({
        type: actions.yudisium.yudisiumWindow.close,
      });
    },
  }
);

const YudisiumWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YudisiumWindow);

export default YudisiumWindowWrapper;
