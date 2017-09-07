import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import CourseProblemForm from './CourseProblemForm';

const CourseProblemWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Course Problem"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    width={400}
  >
    <CourseProblemForm />
  </Modal>
);

CourseProblemWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.courseProblemWindow.visible,
    confirmLoading: state.studentReducers.courseProblemWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_COURSE_PROBLEM_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_COURSE_PROBLEM_LOGIC',
      });
    },
  }
);

const CourseProblemWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseProblemWindow);

export default CourseProblemWindowWrapper;
