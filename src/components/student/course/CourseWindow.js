import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import Button from 'antd/lib/button';
import CourseForm from './CourseForm';
import ScheduleForm from './ScheduleForm';
import ScoreForm from './ScoreForm';
import SeminarForm from './SeminarForm';
import HospitalScheduleWindow from './HospitalScheduleWindow';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

const CourseWindow = ({
  title,
  visible,
  onOk,
  onCancel,
  confirmLoading,
  confirmDelete,
  courseId,
}) => (
  <Modal
    title={title}
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
    width="700"
    footer={[
      <Button key="delete" type="danger" size="large" onClick={() => confirmDelete(title, courseId)}>Delete</Button>,
      <Button key="back" size="large" onClick={onCancel}>Cancel</Button>,
      <Button key="save" type="primary" size="large" loading={confirmLoading} onClick={onOk}>
        Save
      </Button>,
    ]}
  >
    <Tabs defaultActiveKey="1" style={{ marginTop: -10 }}>
      <TabPane tab="Info" key="1">
        <CourseForm />
      </TabPane>
      <TabPane tab="Schedules" key="2">
        <ScheduleForm />
      </TabPane>
      <TabPane tab="Scores" key="3">
        <ScoreForm />
      </TabPane>
      <TabPane tab="Seminars" key="4">
        <SeminarForm />
      </TabPane>
      {/*<TabPane tab="Problems" key="5"></TabPane>*/}
    </Tabs>

    <HospitalScheduleWindow />
  </Modal>
);

CourseWindow.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    title: state.studentReducers.courseWindow.title,
    courseId: state.studentReducers.courseForm.id.value,
    visible: state.studentReducers.courseWindow.visible,
    confirmLoading: state.studentReducers.courseWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_COURSE_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_COURSE_LOGIC',
      });
    },
    confirmDelete: (title, courseId) => (
      confirm({
        title: `Do you Want to delete course: ${title}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_COURSE_LOGIC',
            payload: { id: courseId },
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const CourseWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseWindow);

export default CourseWindowWrapper;
