import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';


class LoginWindow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="layout-container">
        <div className="page-container " style={{ backgroundColor: '#f1f2f3' }}>
          <div className="container-full">
            <div className="container container-xs">
              <div className="mv-lg block-center img-responsive thumb64" />

      <form id="user-login" action="" name="loginForm" novalidate="" className="card b0 form-validate">

        <div className="card-heading">
          <div className="card-title text-center" style={{ color: 'grey' }}>CEU App Login</div>
        </div>
        <div className="card-body">
          <div className="mda-form-group float-label mda-input-group">
            <div className="mda-form-control">
              <input type="email" name="accountName" required="" className="form-control" />
              <div className="mda-form-control-line"></div>
              <label>Email address</label>
            </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
          </div>
          <div className="mda-form-group float-label mda-input-group">
            <div className="mda-form-control">
              <input type="password" name="accountPassword" required="" className="form-control" />
              <div className="mda-form-control-line"></div>
              <label>Password</label>
            </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-flat">Authenticate</button>
      </form>
            <div className="text-center text-sm"><a href="recover.html" className="text-inherit">Forgot password?</a></div>
            <div className="text-center text-sm">
              <em>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
              </em>
            </div>
          </div>
        </div>
      </div>
</div>
    );
  }
}

export default LoginWindow;
