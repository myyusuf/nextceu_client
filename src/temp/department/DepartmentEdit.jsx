import React from 'react';
import axios from 'axios';
import { Row, Col, Modal, Panel, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import Constant from '../Constant';
import LevelSelect from '../level/LevelSelect';

const DEPARTMENTS_URL = `${Constant.serverUrl}/api/departments`;

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
    level: {
      state: null,
      message: '',
    },
    duration: {
      state: null,
      message: '',
    },
    duration1: {
      state: null,
      message: '',
    },
    duration2: {
      state: null,
      message: '',
    },
    duration3: {
      state: null,
      message: '',
    },
    status: true,
  };
};

class DeartmentEdit extends React.Component {

  constructor(props) {
    super(props);

    let departmentId = null;
    let department = {};
    if (props.match.params.departmentId) {
      departmentId = props.match.params.departmentId;
      department = null;
    }

    this.state = {
      departmentId,
      department,
      showModal: false,
      color: '',
      validation: getValidationFields(),
    };

    this.pickColor = this.pickColor.bind(this);
    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.departmentId) {
      axios.get(`${DEPARTMENTS_URL}/${this.state.departmentId}`)
      .then((response) => {
        this.setState({
          department: response.data,
          color: response.data.color ? response.data.color : '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const department = this.state.department;
    department[name] = value;

    const validation = this.validate(department);
    this.setState({
      department,
      validation,
    });
  }

  validate(department) {
    const result = getValidationFields();

    if (!department.code) {
      result.code.state = 'error';
      result.code.message = 'Kode wajib diisi';
      result.status = false;
    } else if (department.code.length < 3) {
      result.code.state = 'error';
      result.code.message = 'Minimum panjang kode adalah tiga karakter';
      result.status = false;
    } else {
      result.code.state = 'success';
      result.code.message = '';
    }

    if (!department.name) {
      result.name.state = 'error';
      result.name.message = 'Nama wajib diisi';
      result.status = false;
    } else if (department.name.length < 3) {
      result.name.state = 'error';
      result.name.message = 'Minimum panjang nama adalah tiga karakter';
      result.status = false;
    } else {
      result.name.state = 'success';
      result.name.message = '';
    }

    if (!department.level) {
      result.level.state = 'error';
      result.level.message = 'Level wajib diisi';
      result.status = false;
    } else {
      result.level.state = 'success';
      result.level.message = '';
    }

    if (!department.duration) {
      result.duration.state = 'error';
      result.duration.message = 'Durasi wajib diisi';
      result.status = false;
    } else {
      result.duration.state = 'success';
      result.duration.message = '';
    }

    if (!department.duration1) {
      result.duration1.state = 'error';
      result.duration1.message = 'Durasi RS 1 wajib diisi';
      result.status = false;
    } else {
      result.duration1.state = 'success';
      result.duration1.message = '';
    }

    if (!department.duration2) {
      result.duration2.state = 'error';
      result.duration2.message = 'Durasi RS 2 wajib diisi';
      result.status = false;
    } else {
      result.duration2.state = 'success';
      result.duration2.message = '';
    }

    if (!department.duration3) {
      result.duration3.state = 'error';
      result.duration3.message = 'Durasi puskesmas wajib diisi';
      result.status = false;
    } else {
      result.duration3.state = 'success';
      result.duration3.message = '';
    }

    return result;
  }

  pickColor() {
    this.setState({
      showModal: true,
    });
  }

  close() {
    this.setState({
      showModal: false,
    });
  }

  handleColorChange(color) {
    const department = this.state.department;
    department.color = color.hex;
    this.setState({
      department,
      color: color.hex,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.department);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    if (this.state.departmentId) {
      axios.put(`${DEPARTMENTS_URL}/${this.state.departmentId}`,
        this.state.department)
      .then((response) => {
        console.log(response);
        window.location.href = '#/departments';
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(DEPARTMENTS_URL,
        this.state.department)
      .then((response) => {
        console.log(response);
        window.location.href = '#/departments';
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    let form = <div>Loading Data</div>;

    if (this.state.department) {
      form = (
        <Row>
          <Col xs={12} md={12} style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
            <Panel header="Edit Bagian" style={{ marginTop: 0 }}>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={12} md={4}>
                    <FormGroup controlId={'code'} validationState={this.state.validation.code.state}>
                      <ControlLabel>Kode</ControlLabel>
                      <FormControl
                        type="text"
                        name="code"
                        value={this.state.department.code}
                        onChange={this.handleInputChange}
                      />
                      <HelpBlock>{this.state.validation.code.message}</HelpBlock>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={8}>
                    <FormGroup controlId={'name'} validationState={this.state.validation.name.state}>
                      <ControlLabel>Nama</ControlLabel>
                      <FormControl
                        type="text"
                        name="name"
                        value={this.state.department.name}
                        onChange={this.handleInputChange}
                      />
                      <HelpBlock>{this.state.validation.name.message}</HelpBlock>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8} md={4}>
                    <FormGroup
                      controlId="level"
                      validationState={this.state.validation.level.state}
                    >
                      <ControlLabel>Tingkat</ControlLabel>
                      <LevelSelect
                        name="level"
                        value={this.state.department.level}
                        onChange={this.handleInputChange}
                      />
                      <HelpBlock>{this.state.validation.level.message}</HelpBlock>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8} md={4}>
                    <FormGroup controlId={'duration'} validationState={this.state.validation.duration.state}>
                      <ControlLabel>Durasi (Minggu)</ControlLabel>
                      <FormControl
                        type="number"
                        name="duration"
                        value={this.state.department.duration}
                        onChange={this.handleInputChange}
                      />
                      <HelpBlock>{this.state.validation.duration.message}</HelpBlock>
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup controlId={'4'}>
                  <Row>
                    <Col xs={8} md={4}>
                      <FormGroup controlId={'duration1'} validationState={this.state.validation.duration1.state}>
                        <ControlLabel>Durasi RS 1</ControlLabel>
                        <FormControl
                          type="number"
                          name="duration1"
                          value={this.state.department.duration1}
                          onChange={this.handleInputChange}
                        />
                        <HelpBlock>{this.state.validation.duration1.message}</HelpBlock>
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={8} md={4}>
                      <FormGroup controlId={'duration2'} validationState={this.state.validation.duration2.state}>
                        <ControlLabel>Durasi RS 2</ControlLabel>
                        <FormControl
                          type="number"
                          name="duration2"
                          value={this.state.department.duration2}
                          onChange={this.handleInputChange}
                        />
                        <HelpBlock>{this.state.validation.duration2.message}</HelpBlock>
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={8} md={4} >
                      <FormGroup controlId={'duration3'} validationState={this.state.validation.duration3.state}>
                        <ControlLabel>Durasi Puskesmas</ControlLabel>
                        <FormControl
                          type="number"
                          name="duration3"
                          value={this.state.department.duration3}
                          onChange={this.handleInputChange}
                        />
                        <HelpBlock>{this.state.validation.duration3.message}</HelpBlock>
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup controlId={'2'}>
                  <ControlLabel>Warna</ControlLabel>
                  <Row>
                    <Col xs={8} md={4} >
                      <FormControl
                        type="text"
                        name="color"
                        readOnly
                        style={{ backgroundColor: this.state.department.color }}
                      />
                    </Col>
                    <Col xs={8} md={4} style={{ paddingLeft: 0 }}>
                      <Button onClick={this.pickColor} bsStyle="info">
                        <i className="fa fa-eyedropper" />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>

                <Button type="submit" bsStyle="primary">
                  Save
                </Button>
                { ' ' }
                <Button type="submit" href="#/departments">
                  Cancel
                </Button>
              </form>
            </Panel>
          </Col>

          <Modal show={this.state.showModal} onHide={this.close} dialogClassName="custom-modal">
            <Modal.Body>
              <SketchPicker
                color={this.state.color}
                onChangeComplete={this.handleColorChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      );
    }

    return (form);
  }
}

export default DeartmentEdit;
