import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import ExportToPreTestForm from './ExportToPreTestForm';

const ExportToPreTestWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Export To Pre Test"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <ExportToPreTestForm />
  </Modal>
);

ExportToPreTestWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.reportReducers.exportToPreTestWindow.visible,
    confirmLoading: state.reportReducers.exportToPreTestWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_PREP_EXPORT_TO_PRE_TEST_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'DO_EXPORT_TO_PRE_TEST_LOGIC',
      });
    },
  }
);

const ExportToPreTestWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportToPreTestWindow);

export default ExportToPreTestWindowWrapper;
