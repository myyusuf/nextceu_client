import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import AddCourseByLevelForm from './AddCourseByLevelForm';

const AddCourseByLevelWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Course By Level"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <AddCourseByLevelForm />
  </Modal>
);

AddCourseByLevelWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentrReducers.addCourseByLevelWindow.visible,
    confirmLoading: state.studentrReducers.addCourseByLevelWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_ADD_COURSE_BY_LEVEL_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_ADD_COURSE_BY_LEVEL_LOGIC',
      });
    },
  }
);

const AddCourseByLevelWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseByLevelWindow);

export default AddCourseByLevelWindowWrapper;
