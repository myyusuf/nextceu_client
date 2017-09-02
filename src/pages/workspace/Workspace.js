import React from 'react';
import Layout, { Header, Content, Sider } from 'antd/lib/layout';
import { Link } from 'react-router-dom';
import Icon from 'antd/lib/icon';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import './Workspace.css';
// import StudentMain from '../student/StudentMain';
// import HospitalMain from '../hospital/HospitalMain';
// import SeminarMain from '../seminar/SeminarMain';
// import UploadList from '../../components/upload/UploadList';
// import SettingsMain from '../../pages/settings/SettingsMain';
import SiderMenu from '../../components/menu/SiderMenu';
import LoginFormContainer from '../../components/login/LoginFormContainer';

const Workspace = ({ children }) => {

  const mainComponent = (
    <Layout style={{ height: '100%' }}>
      <Sider width={60}>
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className="Workspace-header">
          <Link to="/">CEU</Link> | Administration
          <div
            style={{
              width: 160,
              height: 60,
              padding: 14,
              position: 'absolute',
              top: -5,
              right: 100,
            }}
          >
            <Progress percent={70} strokeWidth={7} showInfo={false} />
          </div>
          <div
            style={{
              width: 60,
              height: 60,
              padding: 14,
              position: 'absolute',
              top: 0,
              right: 50,
            }}
          >
            <Icon type="message" style={{ fontSize: 23, color: '#93BDEC' }} />
          </div>
          <div
            style={{
              width: 40,
              height: 111,
              paddingLeft: 9,
              paddingTop: 23,
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: '#5093E1',
              zIndex: 1000,
            }}
          >
            <Icon type="plus" style={{ fontSize: 23, color: '#fff' }} />
          </div>
        </Header>
        <Content className="Workspace-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );

  const loginComponent = (
    <Row style={{ marginTop: 160 }}>
      <Col span={6} offset={9}>
        <LoginFormContainer />
      </Col>
    </Row>
  );

  return loginComponent;
};


export default Workspace;
