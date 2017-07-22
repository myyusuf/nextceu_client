import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, Button } from 'react-bootstrap';
import HospitalDepartmentAddWindow from './HospitalDepartmentAddWindow';
import Constant from '../Constant';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;
const HOSPITAL_DEPARTMENTS_URL = `${Constant.serverUrl}/api/hospitaldepartments`;

class HospitalDepartmentDepartmentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hospital: {},
      hospitalId: this.props.match.params.hospitalId,
      hospitalDepartments: [],
      showHospitalDepartmentAddWindow: false,
    };
    this.loadData = this.loadData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.searchChange = this.searchChange.bind(this);

    this.showHospitalDepartmentAddWindow = this.showHospitalDepartmentAddWindow.bind(this);
    this.showHospitalDepartmentEditWindow = this.showHospitalDepartmentEditWindow.bind(this);
    this.onAddHospitalDepartmentSuccess = this.onAddHospitalDepartmentSuccess.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get(`${HOSPITALS_URL}/${this.state.hospitalId}/departments`)
    .then((response) => {
      this.setState({
        hospitalDepartments: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get(`${HOSPITALS_URL}/${this.state.hospitalId}`)
    .then((response) => {
      this.setState({
        hospital: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  searchChange(event) {
    const searchText = event.target.value;
    this.setState({
      searchText,
    });
  }

  confirmDelete(hospitalDepartment) {
    const result = confirm(`Anda akan menghapus bagian : ${hospitalDepartment.Department.name}?`);
    if (result) {
      axios.delete(`${HOSPITAL_DEPARTMENTS_URL}/${hospitalDepartment.id}`)
      .then((response) => {
        console.log(response);
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  showHospitalDepartmentAddWindow() {
    this.setState({
      hospitalDepartment: {},
      showHospitalDepartmentAddWindow: true,
    });
  }

  showHospitalDepartmentEditWindow(hospitalDepartment) {
    this.setState({
      hospitalDepartment,
      showHospitalDepartmentAddWindow: true,
    });
  }

  onAddHospitalDepartmentSuccess() {
    this.setState({
      hospitalDepartment: {},
      showHospitalDepartmentAddWindow: false,
    }, () => {
      this.loadData();
    });
  }

  render() {
    const hospitalDepartmentComponents = [];
    for (let i = 0; i < this.state.hospitalDepartments.length; i += 1) {
      const hospitalDepartment = this.state.hospitalDepartments[i];
      hospitalDepartmentComponents.push(
        <tr key={hospitalDepartment.id}>
          <td>{ i + 1 }</td>
          <td>{hospitalDepartment.Department ? hospitalDepartment.Department.name : ''}</td>
          <td>{hospitalDepartment.quota}</td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              onClick={() => this.showHospitalDepartmentEditWindow(hospitalDepartment)}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(hospitalDepartment)}>
              <i className="fa fa-remove" />
            </Button>
          </td>
        </tr>
      );
    }
    const title = (
      <Form inline>
        <Button bsStyle="success" onClick={this.showHospitalDepartmentAddWindow}>
          <i className="fa fa-plus" />
        </Button>
      </Form>
    );
    return (
      <div>
        <Row>
          <Col md={12}>
            <div className="panel panel-default" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
              <div className="panel-body">
                <Row>
                  <Col md={10}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginLeft: 10 }}><strong>{ this.state.hospital.name }</strong></div>
                    </div>
                  </Col>
                  <Col md={1} className="text-right">
                    <Button bsStyle="success" onClick={this.showHospitalDepartmentAddWindow}>
                      <i className="fa fa-plus" />
                    </Button>
                  </Col>
                  <Col md={1} className="text-right">
                    <Button bsStyle="primary" href="#/hospitals">
                      Close
                    </Button>
                  </Col>
                </Row>

              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={16} style={{ paddingLeft: 30, paddingRight: 30 }}>
            <Panel header="" style={{ marginTop: 0 }}>
              <Table responsive fill>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Bagian</th>
                    <th>Quota</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalDepartmentComponents}
                </tbody>
              </Table>
            </Panel>
          </Col>
          <HospitalDepartmentAddWindow
            hospitalId={this.state.hospitalId}
            hospitalDepartment={this.state.hospitalDepartment}
            showModal={this.state.showHospitalDepartmentAddWindow}
            onSaveSuccess={this.onAddHospitalDepartmentSuccess}
          />
        </Row>

      </div>
    );
  }
}

export default HospitalDepartmentDepartmentList;
