import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import Constant from '../Constant';

const SIGNIN_URL = `${Constant.serverUrl}/api/security/signin`;

class LoginWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  signIn() {
    axios.post(SIGNIN_URL,
      this.state)
    .then((response) => {
      const token = response.data.token;
      if (typeof(Storage) !== "undefined") {
        window.sessionStorage.setItem('token', token);
        window.location.href = '#/dashboard';
      } else {
          alert('Sorry! No Web Storage support..');
      }

      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      alert(`Login error: ${error.message}`);
    });
  }

  render() {
    return (
      <div className="layout-container">
        <div className="page-container " style={{ backgroundColor: '#f1f2f3' }}>
          <div className="container-full">
            <div className="container container-xs">
              <div className="mv-lg block-center img-responsive thumb64" />
              <form id="user-login" action="" name="loginForm" noValidate="" className="card b0 form-validate">
                <div className="card-offset pb0">
                  <div className="card-offset-item text-right"><a href="signup.html" className="btn-raised btn btn-info btn-circle btn-lg"><em className="ion-person-add"></em></a></div>
                  <div className="card-offset-item text-right hidden">
                    <div className="btn btn-success btn-circle btn-lg"><em className="ion-checkmark-round"></em></div>
                  </div>
                </div>
                <div className="card-heading">
                  <div className="card-title text-center" style={{ color: 'grey' }}>CEU App Login</div>
                </div>
                <div className="card-body">
                  <div className="mda-form-group float-label mda-input-group">
                    <div className="mda-form-control">
                      <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} required className="form-control" placeholder="Username" />
                      <div className="mda-form-control-line"></div>

                    </div><span className="mda-input-group-addon"><em className="ion-ios-person icon-lg"></em></span>
                  </div>
                  <div className="mda-form-group float-label mda-input-group">
                    <div className="mda-form-control">
                      <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required className="form-control" placeholder="Password" />
                      <div className="mda-form-control-line"></div>
                    </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                  </div>
                </div>
                <button type="button" className="btn btn-primary btn-flat" onClick={this.signIn}>Authenticate</button>
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
