import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import RoleAddWindow from './RoleAddWindow';
import Constant from '../Constant';

const ROLES_URL = `${Constant.serverUrl}/api/roles`;

class RoleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      searchText: '',
      showRoleAddWindow: false,
    };
    this.loadData = this.loadData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.searchChange = this.searchChange.bind(this);

    this.showRoleAddWindow = this.showRoleAddWindow.bind(this);
    this.showRoleEditWindow = this.showRoleEditWindow.bind(this);
    this.onAddRoleSuccess = this.onAddRoleSuccess.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get(ROLES_URL, { params: { searchText: this.state.searchText } })
    .then((response) => {
      this.setState({
        roles: response.data,
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

  confirmDelete(role) {
    const result = confirm(`Anda akan menghapus rumah sakit : ${role.name}?`);
    if (result) {
      axios.delete(`${ROLES_URL}/${role.id}`)
      .then((response) => {
        console.log(response);
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  showRoleAddWindow() {
    this.setState({
      role: {},
      showRoleAddWindow: true,
    });
  }

  showRoleEditWindow(role) {
    this.setState({
      role,
      showRoleAddWindow: true,
    });
  }

  onAddRoleSuccess() {
    this.setState({
      role: {},
      showRoleAddWindow: false,
    }, () => {
      this.loadData();
    });
  }

  render() {
    const roleComponents = [];
    for (let i = 0; i < this.state.roles.length; i += 1) {
      const role = this.state.roles[i];
      roleComponents.push(
        <tr key={role.id}>
          <td>{ i + 1 }</td>
          <td>{role.code}</td>
          <td>{role.name}</td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              onClick={() => this.showRoleEditWindow(role)}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(role)}>
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
        <Button bsStyle="success" onClick={this.showRoleAddWindow}>
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
                {roleComponents}
              </tbody>
            </Table>
          </Panel>
        </Col>
        <RoleAddWindow
          role={this.state.role}
          showModal={this.state.showRoleAddWindow}
          onSaveSuccess={this.onAddRoleSuccess}
        />
      </Row>
    );
  }
}

export default RoleList;
