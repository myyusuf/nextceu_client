import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import HospitalAddWindow from './HospitalAddWindow';
import Constant from '../Constant';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;

class HospitalDepartmentList extends React.Component {

  constructor(props) {
    super(props);

    const hospitalId = this.props.match.params.hospitalId;

    this.state = {
      hospitalId,
      hospital: {},
      hospitalDepartments: [],
      showHospitalDeaprtmentAddWindow: false,
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
    axios.get(`${HOSPITALS_URL}/${this.state.hospitalId}/departments`, { params: { searchText: this.state.searchText } })
    .then((response) => {
      this.setState({
        hospitals: response.data,
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
    const result = confirm(`Anda akan menghapus rumah sakit : ${hospital.name}?`);
    if (result) {
      axios.delete(`${HOSPITALS_URL}/${this.state.hospitalId}/departments/${hospitalDepartment.id}`)
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
          <td>{hospitalDepartment.code}</td>
          <td>{hospitalDepartment.name}</td>
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
        <FormGroup controlId="search">
          <FormControl type="text" placeholder="Code or Name" onChange={this.searchChange} />
        </FormGroup>
        {' '}
        <Button onClick={this.loadData}>
          <i className="fa fa-search" />
        </Button>
        {' '}
        <Button bsStyle="success" onClick={this.showHospitalDepartmentAddWindow}>
          <i className="fa fa-plus" />
        </Button>
      </Form>
    );
    return (
      <Row>
        <Col xs={24} md={16} style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
          <Panel header={title} style={{ marginTop: 0 }}>
            <Table responsive fill>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hospitalDepartmentComponents}
              </tbody>
            </Table>
          </Panel>
        </Col>
        <HospitalAddWindow
          hospital={this.state.hospital}
          showModal={this.state.showHospitalDepartmentAddWindow}
          onSaveSuccess={this.onAddHospitalDepartmentSuccess}
        />
      </Row>
    );
  }
}

export default HospitalDepartmentList;
