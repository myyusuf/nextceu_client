import React from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import Constant from '../Constant';

const DEPARTMENTS_URL = `${Constant.serverUrl}/api/departments`;

class DepartmentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departments: [],
    }

    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${DEPARTMENTS_URL}`)
    .then((response) => {
      this.setState({
        departments: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  onSelectionChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (this.props.onChangeWithObject) {
      const departmentId = parseInt(event.target.value, 10);
      const selectedObjects = this.state.departments.find((department) => {
        return department.id === departmentId;
      });

      const foundObject = selectedObjects ? selectedObjects : null;
      this.props.onChangeWithObject(foundObject);
    }
  }

  render() {
    const optionsEl = [];
    optionsEl.push(<option value="" key={-1}>Pilih Bagian</option>);
    for (let i = 0; i < this.state.departments.length; i += 1) {
      const department = this.state.departments[i];
      optionsEl.push(<option key={i} value={department.id}>{department.name}</option>);
    }

    return (
      <FormControl
        componentClass="select"
        name={this.props.name}
        value={this.props.value}
        onChange={this.onSelectionChange}
      >
        {optionsEl}
      </FormControl>
    );
  }
}

export default DepartmentSelect;
