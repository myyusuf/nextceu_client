import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Constant from '../Constant';

const SEMINARS_URL = `${Constant.serverUrl}/api/seminars`;

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

class SeminarWindow extends React.Component {

  constructor(props) {
    super(props);

    const seminar = props.seminar || {}
    this.state = {
      seminar,
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
      seminar: nextProps.seminar,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const seminar = this.state.seminar;
    seminar[name] = value;

    const validation = this.validate(seminar);
    this.setState({
      seminar,
      validation,
    });
  }

  validate(seminar) {
    const result = getValidationFields();

    if (!seminar.code) {
      result.code.state = 'error';
      result.code.message = 'Kode wajib diisi';
      result.status = false;
    } else if (seminar.code.length < 3) {
      result.code.state = 'error';
      result.code.message = 'Minimum panjang kode adalah tiga karakter';
      result.status = false;
    } else {
      result.code.state = 'success';
      result.code.message = '';
    }

    if (!seminar.name) {
      result.name.state = 'error';
      result.name.message = 'Nama wajib diisi';
      result.status = false;
    } else if (seminar.name.length < 3) {
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
    const validation = this.validate(this.state.seminar);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const seminar = this.state.seminar;

    if (seminar.id) {
      axios.put(`${SEMINARS_URL}/${seminar.id}`,
        seminar)
      .then((response) => {
        this.close();
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(SEMINARS_URL,
        seminar)
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
      seminar: {},
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
          <Modal.Title>Tambah Seminar</Modal.Title>
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
                    value={this.state.seminar.code}
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
                    value={this.state.seminar.name}
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

SeminarWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default SeminarWindow;
