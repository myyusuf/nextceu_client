import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import './SiderMenu.css';

const SiderMenu = ({ selectedMenu, selectSiderMenu }) => (
  <div>
    <div className="SiderMenu-box">
      <Icon type="home" style={{ fontSize: 27, color: '#fff' }} />
    </div>
    <div
      onClick={() => selectSiderMenu('student')}
      className={selectedMenu === 'student' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
      style={{ marginTop: 60 }}
    >
      <Icon type="user" className={selectedMenu === 'student' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
    </div>
    <div
      onClick={() => selectSiderMenu('hospital')}
      className={selectedMenu === 'hospital' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
    >
      <Icon type="calendar" className={selectedMenu === 'hospital' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
    </div>
    <div
      onClick={() => selectSiderMenu('seminar')}
      className={selectedMenu === 'seminar' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
    >
      <Icon type="solution" className={selectedMenu === 'seminar' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
    </div>
    <div
      onClick={() => selectSiderMenu('upload')}
      className={selectedMenu === 'upload' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
    >
      <Icon type="cloud-upload-o" className={selectedMenu === 'upload' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
    </div>
    <div
      onClick={() => selectSiderMenu('setting')}
      className={selectedMenu === 'setting' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
    >
      <Icon type="appstore-o" className={selectedMenu === 'setting' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
    </div>
  </div>
);

SiderMenu.propTypes = {
  selectedMenu: PropTypes.string.isRequired,
  selectSiderMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    selectedMenu: state.menuReducers.siderMenu.selectedMenu,
  }
);

const mapDispatchToProps = dispatch => (
  {
    selectSiderMenu: selectedMenu => (
      dispatch({
        type: 'SELECT_SIDER_MENU_LOGIC',
        payload: selectedMenu,
      })
    ),
  }
);

const SiderMenuWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SiderMenu);

export default SiderMenuWrapper;
