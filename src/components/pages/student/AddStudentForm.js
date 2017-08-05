import React, { Component } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { validateEmail } from '../../../utils/validation';

const FormItem = Form.Item;

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleInputChange = (name, value, validation, validationArgs) => {
    if (validation) {
      this.setState({
        [name]: {
          ...validation(name, value, ...validationArgs),
          value,
        },
      });
    } else {
      this.setState({
        [name]: {
          value,
        },
      });
    }
  }

  render(){
    const email = this.state.email || {};
    return(
      <Form>
        <FormItem
          label="Email"
          colon={false}
          validateStatus={email.validateStatus}
          help={email.errorMsg}
        >
          <Input onChange={(e) => {
            this.handleInputChange('email', e.target.value, validateEmail, [])
          }} placeholder="Email" />
        </FormItem>
      </Form>
    )
  }
}

export default StudentForm;
