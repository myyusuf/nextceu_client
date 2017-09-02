import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import LoginForm from './LoginForm';

const LoginFormContainer = ({
  onLogin,
  confirmLoading,
}) => (
  <div
    onLogin={onLogin}
    confirmLoading={confirmLoading}
  >
    <LoginForm />
    <Button type="primary" style={{ width: '100%', height: 30, marginBottom: 10 }} loading={confirmLoading}>
      Log in
    </Button>
    Or <a href="#">register now!</a>
    <div style={{ color: 'silver', fontSize: 11, marginTop: 11 }}>
      Clinical Education Unit Fakultas Kedokteran Universitas Muslim Indonesia (UMI).
      &copy; UMI 2017. All rights reserved.
    </div>
  </div>
);

LoginFormContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    confirmLoading: state.loginReducers.loginFormContainer.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onLogin: () => {
      dispatch({
        type: 'DO_LOGIN_LOGIC',
      });
    },
  }
);

const LoginFormContainerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormContainer);

export default LoginFormContainerWrapper;
