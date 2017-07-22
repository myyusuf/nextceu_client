import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Constant from '../Constant';
import DepartmentSelect from '../department/DepartmentSelect';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;

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

class HospitalWindow extends React.Component {

  constructor(props) {
    super(props);

    const hospital = props.hospital || {}
    this.state = {
      hospital,
      selectedDepartment: '',
      selectedDepartmentObj: null,
      hospitalDepartments: [],
      showModal: props.showModal,
      validation: getValidationFields(),
    };

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectDepartmentObj = this.onSelectDepartmentObj.bind(this);
    this.addDepartment = this.addDepartment.bind(this);
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

  onSelectDepartmentObj(obj) {
    this.setState({
      selectedDepartment: obj.id,
      selectedDepartmentObj: obj,
    });
  }

  addDepartment() {
    if (!this.state.selectedDepartmentObj) return;

    const foundDepartment = this.state.hospitalDepartments.find((department) => {
      return department.id === this.state.selectedDepartmentObj.id;
    });

    if (!foundDepartment) {
      const hospitalDepartments = [];
      hospitalDepartments.push(...this.state.hospitalDepartments);
      hospitalDepartments.push(this.state.selectedDepartmentObj);
      this.setState({
        hospitalDepartments,
        selectedDepartment: '',
        selectedDepartmentObj: null,
      });
    } else {
      alert('Non unique department');
    }
  }

  validate(hospital) {
    const result = getValidationFields();

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
      selectedDepartment: '',
      selectedDepartmentObj: null,
      hospitalDepartments: [],
      validation: getValidationFields(),
    }, () => {
      this.props.onSaveSuccess();
    });
  }

  render() {
    const hospitalDepartmentsComponents = [];
    for (let i = 0; i < this.state.hospitalDepartments.length; i += 1) {
      const department = this.state.hospitalDepartments[i];
      hospitalDepartmentsComponents.push(
        <ListGroupItem key={department.id}>
          <Row>
            <Col md={11}>
              { department.name } ({ department.code })
            </Col>
            <Col md={1}>
              <Button className="text-right" bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(department)}>
                <i className="fa fa-remove" />
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      );
    }
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
            <Row style={{ marginTop: 20 }}>
              <Col md={4}>
                <DepartmentSelect
                  onChangeWithObject={this.onSelectDepartmentObj}
                  value={this.state.selectedDepartment}
                />
              </Col>
              <Col md={2}>
                <Button bsStyle="info" onClick={this.addDepartment}>Add</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col xs={12} md={12}>
                <ListGroup>
                  {hospitalDepartmentsComponents}
                </ListGroup>
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
