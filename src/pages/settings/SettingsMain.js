import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './SettingsMain.css';
import SettingsTree from '../../components/settings/SettingsTree';
import AppPropList from '../../components/settings/AppPropList';
import DepartmentList from '../../components/department/DepartmentList';
import UserList from '../../components/user/UserList';
import RoleList from '../../components/user/RoleList';
import HospitalUserList from '../../components/settings/HospitalUserList';
import UploadList from '../../components/upload/UploadList';
import CptList from '../../components/student/course/cpt/CptList';
import PftList from '../../components/student/course/pft/PftList';
import SgtList from '../../components/student/course/sgt/SgtList';
import DocentList from '../../components/docent/DocentList';
import PengampuList from '../../components/pengampu/PengampuList';
import UptList from '../../components/ukmppd/upt/UptList';

const SettingsMain = ({ selectedMenuKey }) => {
  let componentToRender = <div style={{ padding: 20 }}>No Component</div>;
  switch (selectedMenuKey) {
    case '1-0':
      componentToRender = <AppPropList />;
      break;
    case '1-1':
      componentToRender = <DepartmentList />;
      break;
    case '1-2':
      componentToRender = <UploadList />;
      break;
    case '1-3':
      componentToRender = <CptList />;
      break;
    case '1-4':
      componentToRender = <PftList />;
      break;
    case '1-4b':
      componentToRender = <SgtList />;
      break;
    case '1-5':
      componentToRender = <UptList />;
      break;
    case '1-6':
      componentToRender = <DocentList />;
      break;
    case '1-7':
      componentToRender = <PengampuList />;
      break;
    case '2-1':
      componentToRender = <UserList />;
      break;
    case '2-2':
      componentToRender = <RoleList />;
      break;
    case '2-3':
      componentToRender = <HospitalUserList />;
      break;
    default:
      break;
  }
  return (
    <div>
      <Row>
        <Col span={4}>
          <SettingsTree />
        </Col>
        <Col span={20} style={{ backgroundColor: '#fff' }}>
          {componentToRender}
        </Col>
      </Row>
    </div>
  );
};

SettingsMain.propTypes = {
  selectedMenuKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    selectedMenuKey: state.settingsReducers.settings.selectedMenuKey,
  }
);

const SettingsMainWrapper = connect(
  mapStateToProps,
  null,
)(SettingsMain);

export default SettingsMainWrapper;
