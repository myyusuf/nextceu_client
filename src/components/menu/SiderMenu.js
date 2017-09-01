import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import {
  Link,
} from 'react-router-dom';
import './SiderMenu.css';

const SiderMenu = ({ selectedMenu, selectSiderMenu }) => (
  <div>
    <div className="SiderMenu-box">
      <Icon type="home" style={{ fontSize: 27, color: '#fff' }} />
    </div>
    <Link to="/students">
      <div
        onClick={() => selectSiderMenu('students')}
        className={selectedMenu === 'students' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
        style={{ marginTop: 60 }}
      >
        <Icon type="user" className={selectedMenu === 'students' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
      </div>
    </Link>
    <Link to="/hospitals">
      <div
        onClick={() => {
          selectSiderMenu('hospitals');
          // history.push('/hospitals');
        }}
        className={selectedMenu === 'hospitals' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
      >
        <Icon type="calendar" className={selectedMenu === 'hospitals' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
      </div>
    </Link>
    <Link to="/seminars">
      <div
        onClick={() => selectSiderMenu('seminars')}
        className={selectedMenu === 'seminars' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
      >
        <Icon type="solution" className={selectedMenu === 'seminars' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
      </div>
    </Link>
    <Link to="/uploads">
      <div
        onClick={() => selectSiderMenu('uploads')}
        className={selectedMenu === 'uploads' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
      >
        <Icon type="cloud-upload-o" className={selectedMenu === 'uploads' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
      </div>
    </Link>
    <Link to="/settings">
      <div
        onClick={() => selectSiderMenu('settings')}
        className={selectedMenu === 'settings' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
      >
        <Icon type="appstore-o" className={selectedMenu === 'settings' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
      </div>
    </Link>
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
