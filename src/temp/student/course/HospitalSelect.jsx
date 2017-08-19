import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { Modal, Button, Panel, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Constant from '../../Constant';

const HOSPITAL_SELECT_URL = `${Constant.serverUrl}/api/hospitalselect`;

class HospitalSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hospitals: [],
      department: props.department,
      student: props.student,
      selectedHospital: null,
      showModal: props.showModal,
      formattedStartDate: null,
      startDate: props.startDate,
      formattedEndDate: null,
      endDate: props.endDate,
    };

    this.close = this.close.bind(this);
    this.selectHospital = this.selectHospital.bind(this);
    this.panelClick = this.panelClick.bind(this);

    this.handleDateInputChange1 = this.handleDateInputChange1.bind(this);
    this.handleDateInputChange2 = this.handleDateInputChange2.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      department: nextProps.department,
      student: nextProps.student,
      selectedHospital: null,
      formattedStartDate: null,
      startDate: nextProps.startDate,
      formattedEndDate: null,
      endDate: nextProps.endDate,
    }, () => {
      this.loadData();
    });
  }

  loadData() {
    axios.get(HOSPITAL_SELECT_URL, {
      params:
      {
        hospitalType: 1,
        department: this.state.department ? this.state.department.id : '',
        student: this.state.student ? this.state.student.id : '',
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      },
    })
    .then((response) => {
      this.setState({
        hospitals: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  panelClick(selectedHospital) {
    const hospitals = this.state.hospitals;
    for (let i = 0; i < hospitals.length; i += 1) {
      const hospital = hospitals[i];
      if (selectedHospital.id === hospital.id) {
        hospital.selected = true;
      } else {
        hospital.selected = false;
      }
    }
    this.setState({
      hospitals,
      selectedHospital,
    });
  }

  selectHospital() {
    this.props.onHospitalSelected(this.state.selectedHospital);
  }

  close() {
    this.setState({
      hospitals: [],
      selectedHospital: null,
    }, () => {
      if (this.state.showModal) {
        this.props.onClose();
      }
    });
  }

  handleDateInputChange1(value, formattedValue) {
    this.setState({
      formattedStartDate: formattedValue,
      startDate: value,
    });
  }

  handleDateInputChange2(value, formattedValue) {
    this.setState({
      formattedEndDate: formattedValue,
      endDate: value,
    });
  }

  render() {
    const hospitalListItems = [];
    for (let i = 0; i < this.state.hospitals.length; i += 1) {
      const hospital = this.state.hospitals[i];

      let backgroundColor = '#fff';
      if (hospital.selected) {
        backgroundColor = '#dff0d8';
      }

      hospitalListItems.push(
        <Panel
          key={hospital.id}
          style={{ marginBottom: 10, backgroundColor }}
          onClick={() => this.panelClick(hospital)}
        >
          <Row>
            <Col md={6}>
              { hospital.name }
            </Col>
            <Col md={2}>
              <span className="badge bg-info">{ hospital.departmentQuota }</span>
            </Col>
            <Col md={2}>
              <span className="badge bg-success">{ hospital.studentsInDepartmentCount }</span>
            </Col>
            <Col md={2}>
              <span className="badge bg-default">{ hospital.studentHistoryCount }</span>
            </Col>
          </Row>
        </Panel>
      );
    }
    const title = (
      <div>
        <Row>
          <Col md={5}>
            { this.state.department ? this.state.department.name : '' }
          </Col>
          <Col md={3}>
            <DatePicker
              name="startDate"
              dateFormat="DD/MM/YYYY"
              value={this.state.startDate}
              onChange={this.handleDateInputChange1}
            />
          </Col>
          <Col md={3}>
            <DatePicker
              name="endDate"
              dateFormat="DD/MM/YYYY"
              value={this.state.endDate}
              onChange={this.handleDateInputChange2}
            />
          </Col>
          <Col md={1}>
            <Button bsStyle="default" bsSize="small" onClick={() => this.loadData()}>
              <i className="fa fa-refresh" />
            </Button>
          </Col>
        </Row>
      </div>
    );
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="hospital-select-modal"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {hospitalListItems}
        </Modal.Body>

        <Modal.Footer>
          <span className="badge bg-info" style={{ marginRight: 10 }}>Kuota</span>
          <span className="badge bg-success" style={{ marginRight: 10 }}>Terisi</span>
          <span className="badge bg-danger" style={{ marginRight: 10 }}>Terisi Penuh</span>
          <span className="badge bg-default" style={{ marginRight: 50 }}>History</span>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.selectHospital}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

HospitalSelect.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default HospitalSelect;
