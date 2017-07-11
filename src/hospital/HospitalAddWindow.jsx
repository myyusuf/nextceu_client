import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Constant from '../Constant';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;

class HospitalWindow extends React.Component {

  constructor(props) {
    super(props);

    const hospital = props.hospital || {}
    this.state = {
      hospital,
      showModal: props.showModal,
      validation: {
        code: {
          state: null,
          message: '',
        },
        name: {
          state: null,
          message: '',
        },
        status: true,
      },
    };

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      hospital: nextProps.hospital,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const hospital = this.state.hospital;
    hospital[name] = value;

    const validation = this.validate(hospital);
    this.setState({
      hospital,
      validation,
    });
  }

  validate(hospital) {
    const result =
      {
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

    if (!hospital.code) {
      result.code.state = 'error';
      result.code.message = 'Stambuk baru wajib diisi';
      result.status = false;
    } else if (hospital.code.length < 3) {
      result.code.state = 'error';
      result.code.message = 'Minimum panjang stambuk adalah tiga karakter';
      result.status = false;
    } else {
      result.code.state = 'success';
      result.code.message = '';
    }

    if (!hospital.name) {
      result.name.state = 'error';
      result.name.message = 'Nama wajib diisi';
      result.status = false;
    } else if (hospital.name.length < 3) {
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
    const validation = this.validate(this.state.hospital);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const hospital = this.state.hospital;

    if (hospital.id) {
      axios.put(`${HOSPITALS_URL}/${hospital.id}`,
        hospital)
      .then((response) => {
        this.close();
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(HOSPITALS_URL,
        hospital)
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
      hospital: {},
      validation: {
        code: {
          state: null,
          message: '',
        },
        name: {
          state: null,
          message: '',
        },
        status: true,
      },
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
          <Modal.Title>Tambah Rumah Sakit</Modal.Title>
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
                    value={this.state.hospital.code}
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
                    value={this.state.hospital.name}
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

HospitalWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default HospitalWindow;
