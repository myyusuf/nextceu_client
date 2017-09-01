import React from 'react';
import Layout, { Header, Content, Sider } from 'antd/lib/layout';
import { Link } from 'react-router-dom';
import Icon from 'antd/lib/icon';
import './Workspace.css';
import StudentMain from '../student/StudentMain';
// import HospitalMain from '../hospital/HospitalMain';
// import SeminarMain from '../seminar/SeminarMain';
// import UploadList from '../../components/upload/UploadList';
// import SettingsMain from '../../pages/settings/SettingsMain';

const Workspace = () =>
(
  <Layout style={{ height: '100%' }}>
    <Sider width={60}>
      <div>
        <div style={{ width: 60, height: 60, padding: 14 }}>
          <Icon type="home" style={{ fontSize: 27, color: '#fff' }} />
        </div>
        <div style={{ width: 60, height: 60, padding: 14, marginTop: 60 }}>
          <Icon type="user" style={{ fontSize: 27, color: '#7F8391' }} />
        </div>
        <div style={{ width: 60, height: 60, padding: 14 }}>
          <Icon type="calendar" style={{ fontSize: 27, color: '#7F8391' }} />
        </div>
        <div style={{ width: 60, height: 60, padding: 14 }}>
          <Icon type="solution" style={{ fontSize: 27, color: '#7F8391' }} />
        </div>
        <div style={{ width: 60, height: 60, padding: 14 }}>
          <Icon type="cloud-upload-o" style={{ fontSize: 27, color: '#7F8391' }} />
        </div>
        <div style={{ width: 60, height: 60, padding: 14 }}>
          <Icon type="appstore-o" style={{ fontSize: 27, color: '#7F8391' }} />
        </div>
      </div>
    </Sider>
    <Layout>
      <Header className="Workspace-header">
        <Link to="/">CEU</Link> | Administration
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
        <StudentMain />
      </Content>
    </Layout>
  </Layout>
);

export default Workspace;
