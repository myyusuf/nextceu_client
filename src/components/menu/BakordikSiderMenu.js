import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import {
  Link,
} from 'react-router-dom';
import './SiderMenu.css';

class BakordikSiderMenu extends Component {

  componentWillMount() {
    const selectedMenu = 'students';
    // const location = window.location.href;
    // if (location.indexOf('students') !== -1) {
    //   selectedMenu = 'students';
    // } else if (location.indexOf('hospitals') !== -1) {
    //   selectedMenu = 'hospitals';
    // } else if (location.indexOf('seminars') !== -1) {
    //   selectedMenu = 'seminars';
    // } else if (location.indexOf('reports') !== -1) {
    //   selectedMenu = 'reports';
    // } else if (location.indexOf('settings') !== -1) {
    //   selectedMenu = 'settings';
    // }
    this.props.selectSiderMenu(selectedMenu);
  }

  render() {
    const { selectedMenu, selectSiderMenu } = this.props;
    return (
      <div>
        <div className="SiderMenu-box">
          <Icon type="home" style={{ fontSize: 27, color: '#fff' }} />
        </div>
        <Link to="/bakordik" onClick={() => selectSiderMenu('students')}>
          <div
            className={selectedMenu === 'students' ? 'SiderMenu-box-selected' : 'SiderMenu-box'}
            style={{ marginTop: 60 }}
          >
            <Icon type="team" className={selectedMenu === 'students' ? 'SiderMenu-box-icon-selected' : 'SiderMenu-box-icon'} />
          </div>
        </Link>
      </div>
    );
  }
}

BakordikSiderMenu.propTypes = {
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

const BakordikSiderMenuWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BakordikSiderMenu);

export default BakordikSiderMenuWrapper;
