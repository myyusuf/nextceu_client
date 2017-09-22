import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import TutorForm from './TutorForm';

const TutorWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Tutor"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    width={400}
  >
    <TutorForm />
  </Modal>
);

TutorWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.tutorReducers.tutorWindow.visible,
    confirmLoading: state.tutorReducers.tutorWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_TUTOR_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_TUTOR_LOGIC',
      });
    },
  }
);

const TutorWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorWindow);

export default TutorWindowWrapper;
