import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import SeminarAddWindow from './SeminarAddWindow';
import Constant from '../Constant';

const SEMINAR_URL = `${Constant.serverUrl}/api/seminars`;

class SeminarList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seminars: [],
      searchText: '',
      showSeminarAddWindow: false,
    };
    this.loadData = this.loadData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.searchChange = this.searchChange.bind(this);

    this.showSeminarAddWindow = this.showSeminarAddWindow.bind(this);
    this.showSeminarEditWindow = this.showSeminarEditWindow.bind(this);
    this.onAddSeminarSuccess = this.onAddSeminarSuccess.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get(SEMINAR_URL, { params: { searchText: this.state.searchText } })
    .then((response) => {
      this.setState({
        seminars: response.data,
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

  confirmDelete(seminar) {
    const result = confirm(`Anda akan menghapus seminar : ${seminar.name}?`);
    if (result) {
      axios.delete(`${SEMINAR_URL}/${seminar.id}`)
      .then((response) => {
        console.log(response);
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  showSeminarAddWindow() {
    this.setState({
      seminar: {},
      showSeminarAddWindow: true,
    });
  }

  showSeminarEditWindow(seminar) {
    this.setState({
      seminar,
      showSeminarAddWindow: true,
    });
  }

  onAddSeminarSuccess() {
    this.setState({
      seminar: {},
      showSeminarAddWindow: false,
    }, () => {
      this.loadData();
    });
  }

  render() {
    const seminarComponents = [];
    for (let i = 0; i < this.state.seminars.length; i += 1) {
      const seminar = this.state.seminars[i];
      seminarComponents.push(
        <tr key={seminar.id}>
          <td>{ i + 1 }</td>
          <td>{seminar.code}</td>
          <td>{seminar.name}</td>
          <td>{seminar.eventDate}</td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              onClick={() => this.showSeminarEditWindow(seminar)}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(seminar)}>
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
        <Button bsStyle="success" onClick={this.showSeminarAddWindow}>
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
                  <th>Tanggal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {seminarComponents}
              </tbody>
            </Table>
          </Panel>
        </Col>
        <SeminarAddWindow
          seminar={this.state.seminar}
          showModal={this.state.showSeminarAddWindow}
          onSaveSuccess={this.onAddSeminarSuccess}
        />
      </Row>
    );
  }
}

export default SeminarList;
