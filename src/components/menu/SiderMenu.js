import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import {
  Link,
} from 'react-router-dom';
import './SiderMenu.css';

class SiderMenu extends Component {

  componentWillMount() {
    let selectedMenu = '';
    const location = window.location.href;
    if (location.indexOf('students') !== -1) {
      selectedMenu = 'students';
    } else if (location.indexOf('hospitals') !== -1) {
      selectedMenu = 'hospitals';
    } else if (location.indexOf('seminars') !== -1) {
      selectedMenu = 'seminars';
    } else if (location.indexOf('reports') !== -1) {
      selectedMenu = 'reports';
    } else if (location.indexOf('settings') !== -1) {
      selectedMenu = 'settings';
    }
    this.props.selectSiderMenu(selectedMenu);
  }

  render() {
    const { selectedMenu, selectSiderMenu } = this.props;
    return (
      <div>
        <div className="SiderMenu-box">
          <Icon type="home" style={{ fontSize: 27, color: '#fff' }} />
        </div>
        <Link to="/students" onClick={() => selectSiderMenu('students')}>
          <div
            className={selectedMenu === 'students' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
            style={{ marginTop: 60 }}
          >
            <Icon type="team" className={selectedMenu === 'students' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
          </div>
        </Link>
        <Link to="/hospitals" onClick={() => selectSiderMenu('hospitals')}>
          <div
            className={selectedMenu === 'hospitals' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
          >
            <Icon type="calendar" className={selectedMenu === 'hospitals' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
          </div>
        </Link>
        <Link to="/seminars" onClick={() => selectSiderMenu('seminars')}>
          <div
            className={selectedMenu === 'seminars' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
          >
            <Icon type="solution" className={selectedMenu === 'seminars' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
          </div>
        </Link>
        <Link to="/reports" onClick={() => selectSiderMenu('reports')}>
          <div
            className={selectedMenu === 'reports' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
          >
            <Icon type="copy" className={selectedMenu === 'reports' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
          </div>
        </Link>
        <Link to="/settings" onClick={() => selectSiderMenu('settings')}>
          <div
            className={selectedMenu === 'settings' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
          >
            <Icon type="appstore-o" className={selectedMenu === 'settings' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
          </div>
        </Link>
      </div>
    );
  }
}

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
