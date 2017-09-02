import React from 'react';
import Tabs from 'antd/lib/tabs';
import HospitalFormContainer from '../../components/hospital/HospitalFormContainer';
import HospitalDepartmentList from '../../components/hospital/HospitalDepartmentList';
import HospitalStudentList from '../../components/hospital/HospitalStudentList';
import './HospitalDetailsPage.css';

const TabPane = Tabs.TabPane;

const HospitalDetailsPage = () => (
  <div className="HospitalDetailsPage-container ">
    <Tabs defaultActiveKey="1" tabBarStyle={{ marginLeft: 5 }}>
      <TabPane tab="Main" key="1">
        <HospitalFormContainer />
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

HospitalDetailsPage.propTypes = {
};

export default HospitalDetailsPage;
