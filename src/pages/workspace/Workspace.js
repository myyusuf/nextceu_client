import React, { Component } from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentListPageWrapper from '../../containers/student/StudentListPageWrapper';
import StudentDetailWrapper from '../../containers/student/StudentDetailWrapper';
import CoursePage from '../../components/student/course/CoursePage';
import AddStudentWindowWrapper from '../../containers/student/AddStudentWindowWrapper';

class Workspace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addStudentWindowVisible: false,
    };
  }

  onAddStudentSuccess = () => {
    this.setState({
      addStudentWindowVisible: false,
    });
  }

  onAddStudentCancel = () => {
    this.setState({
      addStudentWindowVisible: false,
    });
  }

  showAddStudentWindow = () => {
    this.setState({
      addStudentWindowVisible: true,
    });
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
              >
                <Menu.Item key="level1">
                  LEVEL 1
                </Menu.Item>
                <Menu.Item key="level2">
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
              <CoursePage />
            </Col>
          </Row>
        </Content>

        <AddStudentWindowWrapper />
      </Layout>
    );
  }
}

export default Workspace;
