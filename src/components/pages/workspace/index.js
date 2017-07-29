import React from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentListContainer from '../../../containers/StudentListContainer';
import StudentDetailContainer from '../../../containers/StudentDetailContainer';

const Search = Input.Search;

const Workspace = () => (
  <Layout>
    <Header className="Workspace-header">
      <Link to="/">CEU</Link> | Administration
    </Header>
    <Content className="Workspace-content">
      <Row>
        <Col span={24}>
        <Menu
          mode="horizontal"
        >
          <Menu.Item key="level1">
            Tingkat 1
          </Menu.Item>
          <Menu.Item key="level2">
            Tingkat 2
          </Menu.Item>
        </Menu>
        </Col>
      </Row>
      <Row>
        <Col span={7}>
          <Row>
            <Col span={24} className="Workspace-student-search-container">
            <Search
              placeholder="Name or SID"
              className="Workspace-student-search"
              onSearch={value => console.log(value)}
            />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <StudentListContainer />
            </Col>
          </Row>

        </Col>
        <Col span={10}>
          <StudentDetailContainer />
        </Col>
        <Col span={7}>
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default Workspace;
