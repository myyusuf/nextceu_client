import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import Button from 'antd/lib/button';
import CourseFormWrapper from '../../../containers/student/course/CourseFormWrapper';
import ScheduleForm from './ScheduleForm';
import ScoreForm from './ScoreForm';
import SeminarForm from './SeminarForm';

const TabPane = Tabs.TabPane;

const CourseWindow = ({ title, visible, onOk, onCancel, confirmLoading }) => (
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
      <Button key="delete" type="danger" size="large" onClick={onCancel}>Delete</Button>,
      <Button key="back" size="large" onClick={onCancel}>Cancel</Button>,
      <Button key="save" type="primary" size="large" loading={confirmLoading} onClick={onOk}>
        Save
      </Button>,
    ]}
  >
    <Tabs defaultActiveKey="1">
      <TabPane tab="Info" key="1">
        <CourseFormWrapper />
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
      <TabPane tab="Problems" key="5"></TabPane>
    </Tabs>
  </Modal>
);

CourseWindow.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

export default CourseWindow;
