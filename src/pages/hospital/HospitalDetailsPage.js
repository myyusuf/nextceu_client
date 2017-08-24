import React from 'react';
import Tabs from 'antd/lib/tabs';

const TabPane = Tabs.TabPane;

const HospitalDetailsPage = () => (
  <div>
    <Tabs defaultActiveKey="1" type="card" style={{ marginLeft: 10 }}>
      <TabPane tab="Main" key="1">Content of Tab Pane 1</TabPane>
      <TabPane tab="Departments" key="2">Content of Tab Pane 2</TabPane>
      <TabPane tab="Students" key="3">Content of Tab Pane 3</TabPane>
    </Tabs>
  </div>
);

HospitalDetailsPage.propTypes = {
};

export default HospitalDetailsPage;
