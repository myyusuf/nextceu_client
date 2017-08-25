import React from 'react';
import Tabs from 'antd/lib/tabs';
import HospitalWindow from '../../components/hospital/HospitalWindow';
import HospitalDepartmentList from '../../components/hospital/HospitalDepartmentList';
import HospitalStudentList from '../../components/hospital/HospitalStudentList';
import './SeminarDetailsPage.css';

const TabPane = Tabs.TabPane;

const SeminarDetailsPage = () => (
  <div className="SeminarDetailsPage-container ">
    <Tabs defaultActiveKey="1" type="card" tabBarStyle={{ marginLeft: 5 }}>
      <TabPane tab="Main" key="1">
        <HospitalWindow />
      </TabPane>
      <TabPane tab="Departments" key="2">
        <HospitalDepartmentList />
      </TabPane>
      <TabPane tab="Students" key="3">
        <HospitalStudentList />
      </TabPane>
    </Tabs>
  </div>
);

SeminarDetailsPage.propTypes = {
};

export default SeminarDetailsPage;
