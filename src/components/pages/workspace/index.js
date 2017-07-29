import React from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentListContainer from '../../../containers/StudentListContainer';

const Workspace = () => (
  <Layout>
    <Header className="Workspace-header">
      <Link to="/">CEU</Link> | Administration
    </Header>
    <Content className="Workspace-content">
      <Row>
        <Col span={7}>
          <StudentListContainer />
        </Col>
        <Col span={10}>col-12</Col>
        <Col span={7}>col-12</Col>
      </Row>
    </Content>
  </Layout>
);

export default Workspace;
