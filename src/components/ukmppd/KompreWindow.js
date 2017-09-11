import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import KompreForm from './KompreForm';

const KompreWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Kompre"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    wrapClassName="vertical-center-modal"
  >
    <KompreForm />
  </Modal>
);

KompreWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.ukmppdReducers.portofolioWindow.visible,
    confirmLoading: state.ukmppdReducers.portofolioWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_KOMPRE_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_KOMPRE_LOGIC',
      });
    },
  }
);

const KompreWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KompreWindow);

export default KompreWindowWrapper;
