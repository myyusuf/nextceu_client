import React from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentMain from '../student/StudentMain';
// import HospitalMain from '../hospital/HospitalMain';
// import SeminarMain from '../seminar/SeminarMain';
// import UploadList from '../../components/upload/UploadList';
// import SettingsMain from '../../pages/settings/SettingsMain';

const Workspace = () =>
(
  <Layout>
    <Header className="Workspace-header">
      <Link to="/">CEU</Link> | Administration
    </Header>
    <Content className="Workspace-content">
      <StudentMain />
      {/*<SettingsMain />*/}
    </Content>
  </Layout>
);

export default Workspace;
