import React, { Component } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { validateLength } from '../../../utils/validation';

const FormItem = Form.Item;

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: {},
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
    const code = this.state.code;
    return(
      <Form>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={code.validateStatus}
          help={code.errorMsg}
        >
          <Input onChange={(e) => {
            this.handleInputChange('code', e.target.value, validateLength, [3])
          }} placeholder="Username" />
        </FormItem>
      </Form>
    )
  }
}

export default StudentForm;
