import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import PortofolioForm from './PortofolioForm';

const PortofolioWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Portofolio"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    wrapClassName="vertical-center-modal"
  >
    <PortofolioForm />
  </Modal>
);

PortofolioWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.portofolioWindow.visible,
    confirmLoading: state.studentReducers.portofolioWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_PORTOFOLIO_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_PORTOFOLIO_LOGIC',
      });
    },
  }
);

const PortofolioWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PortofolioWindow);

export default PortofolioWindowWrapper;
