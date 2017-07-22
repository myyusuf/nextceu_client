import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import Constant from '../Constant';
import DepartmentSelect from '../department/DepartmentSelect';

const HOSPITAL_DEPARTMENTS_URL = `${Constant.serverUrl}/api/hospitaldepartments`;

const getValidationFields = () => {
  return {
    department: {
      state: null,
      message: '',
    },
    quota: {
      state: null,
      message: '',
    },
    status: true,
  };
};

class HospitalDepartmentWindow extends React.Component {

  constructor(props) {
    super(props);

    const hospitalId = props.hospitalId || null;
    const hospitalDepartment = props.hospitalDepartment || {};
    this.state = {
      hospitalId,
      hospitalDepartment,
      validation: getValidationFields(),
    };

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      hospitalId: nextProps.hospitalId,
      hospitalDepartment: nextProps.hospitalDepartment,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const hospitalDepartment = this.state.hospitalDepartment;
    hospitalDepartment[name] = value;

    const validation = this.validate(hospitalDepartment);
    this.setState({
      hospitalDepartment,
      validation,
    });
  }

  validate(hospitalDepartment) {
    const result = getValidationFields();

    if (!hospitalDepartment.department) {
      result.department.state = 'error';
      result.department.message = 'Bagian wajib diisi';
      result.status = false;
    } else {
      result.department.state = 'success';
      result.department.message = '';
    }

    if (!hospitalDepartment.quota) {
      result.quota.state = 'error';
      result.quota.message = 'Quota wajib diisi';
      result.status = false;
    } else {
      result.quota.state = 'success';
      result.quota.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.hospitalDepartment);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const hospitalDepartment = this.state.hospitalDepartment;

    if (hospitalDepartment.id) {
      axios.put(`${HOSPITAL_DEPARTMENTS_URL}/${hospitalDepartment.id}`,
        hospitalDepartment)
      .then((response) => {
        this.close();
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(`${HOSPITAL_DEPARTMENTS_URL}`,
        hospitalDepartment)
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
      hospitalId: null,
      hospitalDepartment: {},
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
          <Modal.Title>Tambah Bagian</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'department'} validationState={this.state.validation.department.state}>
                  <ControlLabel>Kode</ControlLabel>
                  <FormControl
                    type="text"
                    name="department"
                    value={this.state.hospitalDepartment.department}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.department.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <DepartmentSelect
                  onChange={this.onSelectDepartment}
                  value={this.state.hospitalDepartment.Department.id}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId={'quota'} validationState={this.state.validation.quota.state}>
                  <ControlLabel>Nama</ControlLabel>
                  <FormControl
                    type="text"
                    name="quota"
                    value={this.state.hospitalDepartment.quota}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.quota.message}</HelpBlock>
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

HospitalDepartmentWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default HospitalDepartmentWindow;
