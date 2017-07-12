import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import UserAddWindow from './UserAddWindow';
import Constant from '../Constant';

const USERS_URL = `${Constant.serverUrl}/api/users`;

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchText: '',
      showUserAddWindow: false,
    };
    this.loadData = this.loadData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.searchChange = this.searchChange.bind(this);

    this.showUserAddWindow = this.showUserAddWindow.bind(this);
    this.showUserEditWindow = this.showUserEditWindow.bind(this);
    this.onAddUserSuccess = this.onAddUserSuccess.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get(USERS_URL, { params: { searchText: this.state.searchText } })
    .then((response) => {
      this.setState({
        users: response.data,
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

  confirmDelete(user) {
    const result = confirm(`Anda akan menghapus user : ${user.name}?`);
    if (result) {
      axios.delete(`${USERS_URL}/${user.id}`)
      .then((response) => {
        console.log(response);
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  showUserAddWindow() {
    this.setState({
      user: {},
      showUserAddWindow: true,
    });
  }

  showUserEditWindow(user) {
    this.setState({
      user,
      showUserAddWindow: true,
    });
  }

  onAddUserSuccess() {
    this.setState({
      user: {},
      showUserAddWindow: false,
    }, () => {
      this.loadData();
    });
  }

  render() {
    const userComponents = [];
    for (let i = 0; i < this.state.users.length; i += 1) {
      const user = this.state.users[i];
      const roleName = user.Role ? user.Role.name : '';
      userComponents.push(
        <tr key={user.id}>
          <td>{ i + 1 }</td>
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>{roleName}</td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              onClick={() => this.showUserEditWindow(user)}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(user)}>
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
        <Button bsStyle="success" onClick={this.showUserAddWindow}>
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
                  <th>Username</th>
                  <th>Nama</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userComponents}
              </tbody>
            </Table>
          </Panel>
        </Col>
        <UserAddWindow
          user={this.state.user}
          showModal={this.state.showUserAddWindow}
          onSaveSuccess={this.onAddUserSuccess}
        />
      </Row>
    );
  }
}

export default UserList;
