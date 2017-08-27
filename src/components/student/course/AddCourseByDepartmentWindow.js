import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import AddCourseByDepartmentForm from './AddCourseByDepartmentForm';

const AddCourseByDepartmentWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Course By Department"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <AddCourseByDepartmentForm />
  </Modal>
);

AddCourseByDepartmentWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentrReducers.addCourseByDepartmentWindow.visible,
    confirmLoading: state.studentrReducers.addCourseByDepartmentWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_ADD_COURSE_BY_DEPARTMENT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_ADD_COURSE_BY_DEPARTMENT_LOGIC',
      });
    },
  }
);

const AddCourseByDepartmentWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseByDepartmentWindow);

export default AddCourseByDepartmentWindowWrapper;
