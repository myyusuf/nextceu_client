import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import HospitalScheduleForm from './HospitalScheduleForm';

const HospitalScheduleWindow = ({
  visible,
  onOk,
  onCancel,
}) => (
  <Modal
    title="Select Hospital"
    visible={visible}
    okText="Save"
    onOk={onOk}
    onCancel={onCancel}
    width={600}
  >
    <HospitalScheduleForm />
  </Modal>
);

HospitalScheduleWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.hospitalScheduleWindow.visible,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'HIDE_HOSPITAL_SCHEDULE_WINDOW',
      });
    },
    onOk: () => {
      dispatch({
        type: 'HOSPITAL_SCHEDULE_DID_SELECT_LOGIC',
      });
    },
  }
);

const HospitalScheduleWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalScheduleWindow);

export default HospitalScheduleWindowWrapper;
