import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import Button from 'antd/lib/button';
import CourseForm from './CourseForm';
import ScheduleForm from './ScheduleForm';
import ScoreList from './score/ScoreList';
import SeminarList from './SeminarList';
import CourseProblemList from './course_problem/CourseProblemList';
import PortofolioList from './portofolio/PortofolioList';
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
  confirmPending,
  courseId,
  courseStatus,
  confirmUnPending,
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
    footer={[courseStatus !== 4 ?
      <Button key="pending" type="danger" size="large" onClick={() => confirmPending(title, courseId)}>Pending</Button>
      :
      <Button key="unPending" type="default" size="large" onClick={() => confirmUnPending(title, courseId)}>Un Pending</Button>,

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
        <ScoreList />
      </TabPane>
      <TabPane tab="Seminars" key="4">
        <SeminarList />
      </TabPane>
      <TabPane tab="Seminars" key="5">
        <PortofolioList />
      </TabPane>
      <TabPane tab="Problems" key="6">
        <CourseProblemList />
      </TabPane>
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
  confirmPending: PropTypes.func.isRequired,
  confirmUnPending: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
  courseStatus: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    title: state.studentReducers.courseWindow.title,
    courseId: state.studentReducers.courseForm.id.value,
    visible: state.studentReducers.courseWindow.visible,
    confirmLoading: state.studentReducers.courseWindow.confirmLoading,
    courseStatus: state.studentReducers.courseForm.status ?
    state.studentReducers.courseForm.status.value : null,
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
    confirmPending: (title, courseId) => (
      confirm({
        title: `Do you Want to pending course: ${title}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'PENDING_COURSE_LOGIC',
            payload: { id: courseId },
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
    confirmUnPending: (title, courseId) => (
      confirm({
        title: `Do you Want to unpending course: ${title}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'UN_PENDING_COURSE_LOGIC',
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
