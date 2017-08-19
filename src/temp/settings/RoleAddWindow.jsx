import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Constant from '../Constant';

const ROLES_URL = `${Constant.serverUrl}/api/roles`;

const getValidationFields = () => {
  return {
    code: {
      state: null,
      message: '',
    },
    name: {
      state: null,
      message: '',
    },
    status: true,
  };
};

class RoleWindow extends React.Component {

  constructor(props) {
    super(props);

    const role = props.role || {}
    this.state = {
      role,
      showModal: props.showModal,
      validation: getValidationFields(),
    };

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      role: nextProps.role,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const role = this.state.role;
    role[name] = value;

    const validation = this.validate(role);
    this.setState({
      role,
      validation,
    });
  }

  validate(role) {
    const result = getValidationFields();

    if (!role.code) {
      result.code.state = 'error';
      result.code.message = 'Kode wajib diisi';
      result.status = false;
    } else if (role.code.length < 3) {
      result.code.state = 'error';
      result.code.message = 'Minimum panjang kode adalah tiga karakter';
      result.status = false;
    } else {
      result.code.state = 'success';
      result.code.message = '';
    }

    if (!role.name) {
      result.name.state = 'error';
      result.name.message = 'Nama wajib diisi';
      result.status = false;
    } else if (role.name.length < 3) {
      result.name.state = 'error';
      result.name.message = 'Minimum panjang nama adalah tiga karakter';
      result.status = false;
    } else {
      result.name.state = 'success';
      result.name.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.role);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const role = this.state.role;

    if (role.id) {
      axios.put(`${ROLES_URL}/${role.id}`,
        role)
      .then((response) => {
        this.close();
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(ROLES_URL,
        role)
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
      role: {},
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
          <Modal.Title>Tambah Role</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'code'} validationState={this.state.validation.code.state}>
                  <ControlLabel>Kode</ControlLabel>
                  <FormControl
                    type="text"
                    name="code"
                    value={this.state.role.code}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.code.message}</HelpBlock>
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
                    value={this.state.role.name}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.name.message}</HelpBlock>
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

RoleWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default RoleWindow;
