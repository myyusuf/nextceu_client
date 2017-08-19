import React from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import Constant from '../Constant';

const ROLE_URL = `${Constant.serverUrl}/api/roles`;

class RoleSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      roles: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get(ROLE_URL, { params: { } })
    .then((response) => {
      this.setState({
        roles: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const roleElements = [];
    for (let i = 0; i < this.state.roles.length; i += 1) {
      const role = this.state.roles[i];
      roleElements.push(
        <option value={role.id} key={role.id}>{role.name}</option>
      );
    }
    return (
      <FormControl
        componentClass="select"
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <option value="">Pilih Role</option>
        {roleElements}
      </FormControl>
    );
  }
}

export default RoleSelect;
