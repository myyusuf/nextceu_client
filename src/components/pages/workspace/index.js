import React, { Component } from 'react';
import Layout, { Header, Content } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import './Workspace.css';
import StudentListWrapper from '../../../containers/student/StudentListWrapper';
import StudentDetailWrapper from '../../../containers/student/StudentDetailWrapper';
import CoursePage from '../../../components/pages/student/course/CoursePage';
import AddStudentWindow from '../../../components/pages/student/AddStudentWindow';

const Search = Input.Search;

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
              <Row>
                <Col span={20} className="Workspace-student-search-container">
                  <Search
                    placeholder="Name or SID"
                    className="Workspace-student-search"
                    onSearch={value => console.log(value)}
                  />
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    style={{ marginTop: 20 }}
                    onClick={() => this.showAddStudentWindow()}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <StudentListWrapper />
                </Col>
              </Row>

            </Col>
            <Col span={10}>
              <StudentDetailWrapper />
            </Col>
            <Col span={7}>
              <CoursePage />
            </Col>
          </Row>
        </Content>

        <AddStudentWindow
          visible={this.state.addStudentWindowVisible}
          onSaveSucess={() => this.onAddStudentSuccess()}
          onCancel={() => this.onAddStudentCancel()}
        />
      </Layout>
    );
  }
}

export default Workspace;
