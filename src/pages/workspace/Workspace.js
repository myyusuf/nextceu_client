import React, { Component } from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentListPageWrapper from '../../containers/student/StudentListPageWrapper';
import StudentDetailWrapper from '../../containers/student/StudentDetailWrapper';
import CoursePageWrapper from '../../containers/student/CoursePageWrapper';
import AddStudentWindowWrapper from '../../containers/student/AddStudentWindowWrapper';

class Workspace extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Header className="Workspace-header">
          <Link to="/">CEU</Link> | Administration
        </Header>
        <Content className="Workspace-content">
          <Row>
            <Col span={24}>
              <Menu
                mode="horizontal"
                selectedKeys={[this.props.studentFilter.level]}
                onClick={event => this.props.filterStudents(event.key)}
              >
                <Menu.Item key="1">
                  LEVEL 1
                </Menu.Item>
                <Menu.Item key="2">
                  LEVEL 2
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <StudentListPageWrapper />
            </Col>
            <Col span={10}>
              <StudentDetailWrapper />
            </Col>
            <Col span={7}>
              <CoursePageWrapper />
            </Col>
          </Row>
        </Content>

        <AddStudentWindowWrapper />
      </Layout>
    );
  }
}

export default Workspace;
