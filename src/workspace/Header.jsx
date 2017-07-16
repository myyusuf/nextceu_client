import React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(eventKey, event) {
    console.log(eventKey);
    if (eventKey === 3) {
      window.sessionStorage.removeItem('token');
      window.location.href = '#/login';
    } else {
      window.location.href = '#/dashboard';
    }
  }


  render() {
    const ddMenuItem = (
      <span>
        <em className="ion-person"></em><sup className="badge bg-danger">3</sup>
      </span>);

      let title = '';
      if (this.props.location.indexOf('dashboard') > 0) {
        title = 'Dashboard';
      } else if (this.props.location.indexOf('students') > 0) {
        title = 'Mahasiswa';
      } else if (this.props.location.indexOf('departments') > 0) {
        title = 'Bagian';
      } else if (this.props.location.indexOf('hospitals') > 0) {
        title = 'Rumah Sakit';
      } else if (this.props.location.indexOf('seminars') > 0) {
        title = 'Seminar';
      } else if (this.props.location.indexOf('users') > 0) {
        title = 'User';
      } else if (this.props.location.indexOf('roles') > 0) {
        title = 'Role';
      }

    return (
      <header className="header-container">
        <nav>
          <ul className="visible-xs visible-sm">
            <li><a id="sidebar-toggler" href="#" className="menu-link menu-link-slide"><span><em></em></span></a></li>
          </ul>
          <ul className="hidden-xs">
              <li><a id="offcanvas-toggler" href="#" className="menu-link menu-link-slide"><span><em></em></span></a></li>
          </ul>
          <h2 className="header-title">{title}</h2>

          <ul className="pull-right">
              <li>
                  <a href="#/dashboard" className="ripple" onClick={this.showSearch}>
                      <em className="ion-ios-search-strong"></em>
                  </a>
              </li>
              <Dropdown id="basic-nav-dropdown" pullRight componentClass="li" onSelect={this.onSelect}>
                  <Dropdown.Toggle useAnchor noCaret className="has-badge ripple">
                    <em className="ion-person"></em>
                    <sup className="badge bg-danger"></sup>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="md-dropdown-menu" >
                    <MenuItem eventKey={1}>
                        <em className="ion-home icon-fw"></em>
                        Profile
                    </MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3}><em className="ion-log-out icon-fw"></em>Logout</MenuItem>
                  </Dropdown.Menu>
              </Dropdown>
              <li>
                  <a href="#/dashboard" className="ripple" onClick={this.showSettings}>
                      <em className="ion-gear-b"></em>
                  </a>
              </li>
          </ul>

        </nav>
      </header>
    );
  }
}

export default Header;
