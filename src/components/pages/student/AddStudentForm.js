import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { validateEmail, validatePassword } from '../../../utils/validation';

const FormItem = Form.Item;

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleInputChange = (name, value, validation, validationArgs) => {
    if (validation) {
      this.setState({
        [name]: {
          ...validation(name, value, ...validationArgs),
          value,
        },
      }, this.props.onFormChange(this.state));
    } else {
      this.setState({
        [name]: {
          value,
        },
      }, this.props.onFormChange(this.state));
    }
  }

  render() {
    const email = this.state.email || {};
    const password = this.state.password || {};
    return (
      <Form>
        <FormItem
          label="Email"
          colon={false}
          validateStatus={email.validateStatus}
          help={email.errorMsg}
        >
          <Input
            onChange={(e) => {
              this.handleInputChange('email', e.target.value, validateEmail, []);
            }}
            placeholder="Email"
          />
        </FormItem>
        <FormItem
          label="Password"
          colon={false}
          validateStatus={password.validateStatus}
          help={password.errorMsg}
        >
          <Input
            onChange={(e) => {
              this.handleInputChange('password', e.target.value, validatePassword, [5]);
            }}
            placeholder="Password"
          />
        </FormItem>
      </Form>
    );
  }
}

StudentForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default StudentForm;
