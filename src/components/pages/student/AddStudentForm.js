import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { validateEmail, validatePassword } from '../../../utils/validation';

const FormItem = Form.Item;

class StudentForm extends Component {

  handleInputChange = (name, value, validation, validationArgs) => {
    let result = null;
    if (validation) {
      result = {
        fieldName: name,
        value,
        ...validation(name, value, ...validationArgs),
      };
    } else {
      result = {
        fieldName: name,
        value,
      };
    }

    this.props.updateStudentForm(result);
  }

  render() {
    const { email, password } = this.props.studentForm;
    return (
      <Form>
        <FormItem
          label="Email"
          colon={false}
          validateStatus={email.validateStatus}
          help={email.errorMsg}
        >
          <Input
            value={email.value}
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
            value={password.value}
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
  updateStudentForm: PropTypes.func.isRequired,
  // studentForm: PropTypes.shape.isRequired,
};

export default StudentForm;
