import React from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentMain from '../student/StudentMain';

const Workspace = () =>
(
  <Layout>
    <Header className="Workspace-header">
      <Link to="/">CEU</Link> | Administration
    </Header>
    <Content className="Workspace-content">
      <StudentMain />
    </Content>
  </Layout>
);

export default Workspace;
