import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Checkbox from 'antd/lib/checkbox';

const FormItem = Form.Item;

const LoginForm = ({ loginForm, loginFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem>
          <div style={{ width: 158, marginLeft: 'auto', marginRight: 'auto', marginBottom: 15 }}>
            <span style={{ fontSize: 20, color: '#5093E1', fontWeight: 'bold' }}>CEU</span>
            <span style={{ fontSize: 20, color: 'gray' }}> | </span>
            <span style={{ fontSize: 15, color: 'silver' }}>Administration</span>
          </div>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          validateStatus={loginForm.username.validateStatus}
          help={loginForm.username.errorMsg}
        >
          <Input
            value={loginForm.username.value}
            onChange={(e) => {
              loginFormChanged({
                key: 'username',
                value: e.target.value,
              });
            }}
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="Username"
            maxLength={20}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          validateStatus={loginForm.password.validateStatus}
          help={loginForm.password.errorMsg}
        >
          <Input
            value={loginForm.password.value}
            onChange={(e) => {
              loginFormChanged({
                key: 'password',
                value: e.target.value,
              });
            }}
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            type="password"
            placeholder="Password"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <a style={{ float: 'right' }} href="#">Forgot password?</a>
        </FormItem>
      </Col>
    </Row>
  </Form>
);

LoginForm.propTypes = {
  loginFormChanged: PropTypes.func.isRequired,
  loginForm: PropTypes.shape({
    username: PropTypes.shape.isRequired,
    password: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    loginForm: state.loginReducers.loginForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    loginFormChanged: (payload) => {
      dispatch({
        type: 'LOGIN_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const LoginFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default LoginFormWrapper;
