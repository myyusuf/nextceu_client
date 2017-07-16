import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import axios from 'axios';
import Constant from '../../Constant';
import DepartmentSelect from '../../department/DepartmentSelect';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

class CourseAddByDepartmentWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: props.student,
      courseByDepartment: {},
      showModal: this.props.showModal,
      validation: {
        title: {
          state: null,
          message: '',
        },
        startDate: {
          state: null,
          message: '',
        },
        department: {
          state: null,
          message: '',
        },
        status: true,
      },
    };

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      student: nextProps.student,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const courseByDepartment = this.state.courseByDepartment;
    courseByDepartment[name] = value;

    const validation = this.validate(courseByDepartment);
    this.setState({
      courseByDepartment,
      validation,
    });
  }

  handleDateInputChange(value, formattedValue) {
    const courseByDepartment = this.state.courseByDepartment;
    courseByDepartment.formattedStartDate = formattedValue;
    courseByDepartment.startDate = value;

    const validation = this.validate(courseByDepartment);
    validation.courseByDepartment = validation;
    this.setState({
      courseByDepartment,
      validation,
    });
  }

  validate(courseByDepartment) {
    const result =
      {
        title: {
          state: null,
          message: '',
        },
        startDate: {
          state: null,
          message: '',
        },
        department: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!courseByDepartment.department) {
      result.department.state = 'error';
      result.department.message = 'Bagian wajib diisi';
      result.status = false;
    } else {
      result.department.state = 'success';
      result.department.message = '';
    }

    if (!courseByDepartment.title) {
      result.title.state = 'error';
      result.title.message = 'Judul wajib diisi';
      result.status = false;
    } else if (courseByDepartment.title.length < 1) {
      result.title.state = 'error';
      result.title.message = 'Minimum panjang title adalah satu karakter';
      result.status = false;
    } else {
      result.title.state = 'success';
      result.title.message = '';
    }

    if (!courseByDepartment.startDate) {
      result.startDate.state = 'error';
      result.startDate.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.startDate.state = 'success';
      result.startDate.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.courseByDepartment);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const form = this.state.courseByDepartment;
    form.formType = 'DEPARTMENT';
    axios.post(`${STUDENTS_URL}/${this.state.student.id}/courses`,
      form)
    .then((response) => {
      this.close();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  close() {
    this.setState({
      showModal: false,
      courseByDepartment: {},
      validation: {
        title: {
          state: null,
          message: '',
        },
        startDate: {
          state: null,
          message: '',
        },
        department: {
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
          <Modal.Title>Tambah Bagian</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={4}>
              <FormGroup
                controlId="department"
                validationState={this.state.validation.department.state}
              >
                <DepartmentSelect
                  name="department"
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.department.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup
                controlId="startDate"
                validationState={this.state.validation.startDate.state}
              >
                <DatePicker
                  name="startDate"
                  dateFormat="DD/MM/YYYY"
                  value={this.state.courseByDepartment.startDate}
                  onChange={this.handleDateInputChange}
                />
                <HelpBlock>{this.state.validation.startDate.message}</HelpBlock>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup
                controlId="title"
                validationState={this.state.validation.title.state}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Judul"
                  className="form-control"
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.title.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CourseAddByDepartmentWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default CourseAddByDepartmentWindow;
