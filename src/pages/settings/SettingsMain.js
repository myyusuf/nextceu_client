import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './SettingsMain.css';
import SettingsTree from '../../components/settings/SettingsTree';
import DepartmentList from '../../components/department/DepartmentList';
import UserList from '../../components/user/UserList';
import RoleList from '../../components/user/RoleList';
import UploadList from '../../components/upload/UploadList';
import CptList from '../../components/student/course/cpt/CptList';

const SettingsMain = ({ selectedMenuKey }) => {
  let componentToRender = <div style={{ padding: 20 }}>No Component</div>;
  switch (selectedMenuKey) {
    case '1-1':
      componentToRender = <DepartmentList />;
      break;
    case '1-2':
      componentToRender = <UploadList />;
      break;
    case '1-3':
      componentToRender = <CptList />;
      break;
    case '2-1':
      componentToRender = <UserList />;
      break;
    case '2-2':
      componentToRender = <RoleList />;
      break;
    default:
      break;
  }
  return (
    <div>
      <Row>
        <Col span={6}>
          <SettingsTree />
        </Col>
        <Col span={18} style={{ backgroundColor: '#fff' }}>
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
