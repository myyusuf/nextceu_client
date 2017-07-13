import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import RoleSelect from '../settings/RoleSelect';
import Constant from '../Constant';

const USERS_URL = `${Constant.serverUrl}/api/users`;

const getValidationFields = () => {
  return {
    username: {
      state: null,
      message: '',
    },
    password: {
      state: null,
      message: '',
    },
    name: {
      state: null,
      message: '',
    },
    role: {
      state: null,
      message: '',
    },
    status: true,
  };
};

class UserWindow extends React.Component {

  constructor(props) {
    super(props);

    const user = props.user || {}
    this.state = {
      user,
      showModal: props.showModal,
      validation: getValidationFields(),
    };

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    if (user.Role) {
      user.role = user.Role.id;
    }
    this.setState({
      showModal: nextProps.showModal,
      user,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const user = this.state.user;
    user[name] = value;

    const validation = this.validate(user);
    this.setState({
      user,
      validation,
    });
  }

  validate(user) {
    const result = getValidationFields();

    if (!user.username) {
      result.username.state = 'error';
      result.username.message = 'Username wajib diisi';
      result.status = false;
    } else if (user.username.length < 3) {
      result.username.state = 'error';
      result.username.message = 'Minimum panjang username adalah tiga karakter';
      result.status = false;
    } else {
      result.username.state = 'success';
      result.username.message = '';
    }

    if (!user.password) {
      result.password.state = 'error';
      result.password.message = 'Password wajib diisi';
      result.status = false;
    } else if (user.password.length < 5) {
      result.password.state = 'error';
      result.password.message = 'Minimum panjang password adalah lima karakter';
      result.status = false;
    } else {
      result.password.state = 'success';
      result.password.message = '';
    }

    if (!user.name) {
      result.name.state = 'error';
      result.name.message = 'Nama wajib diisi';
      result.status = false;
    } else if (user.name.length < 3) {
      result.name.state = 'error';
      result.name.message = 'Minimum panjang nama adalah tiga karakter';
      result.status = false;
    } else {
      result.name.state = 'success';
      result.name.message = '';
    }

    if (!user.role) {
      result.role.state = 'error';
      result.role.message = 'Role wajib diisi';
      result.status = false;
    } else {
      result.role.state = 'success';
      result.role.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.user);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const user = this.state.user;

    if (user.id) {
      axios.put(`${USERS_URL}/${user.id}`,
        user)
      .then((response) => {
        this.close();
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(USERS_URL,
        user)
      .then((response) => {
        this.close();
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }

  close() {
    this.setState({
      showModal: false,
      user: {},
      validation: getValidationFields(),
    }, () => {
      this.props.onSaveSuccess();
    });
  }

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
      >
        <Modal.Header>
          <Modal.Title>Tambah User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'username'} validationState={this.state.validation.username.state}>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    name="username"
                    value={this.state.user.username}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.username.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'password'} validationState={this.state.validation.password.state}>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    type="password"
                    name="password"
                    value={this.state.user.password}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.password.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'name'} validationState={this.state.validation.name.state}>
                  <ControlLabel>Nama</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.user.name}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.name.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'name'} validationState={this.state.validation.role.state}>
                  <ControlLabel>Role</ControlLabel>
                  <RoleSelect
                    name="role"
                    value={this.state.user.role}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.role.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

UserWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default UserWindow;
