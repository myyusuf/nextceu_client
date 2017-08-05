import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import { validateLength, validateEmail } from '../../../utils/validation';

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
    const { oldSid, newSid, name, level, email } = this.props.studentForm;
    return (
      <Form>
        <Row gutter={15}>
          <Col span={12}>
            <FormItem
              label="Old SID"
              colon={false}
              validateStatus={oldSid.validateStatus}
              help={oldSid.errorMsg}
            >
              <Input
                value={oldSid.value}
                onChange={(e) => {
                  this.handleInputChange('oldSid', e.target.value, validateLength, [3]);
                }}
                placeholder="Old SID"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="New SID"
              colon={false}
              validateStatus={newSid.validateStatus}
              help={newSid.errorMsg}
            >
              <Input
                value={newSid.value}
                onChange={(e) => {
                  this.handleInputChange('newSid', e.target.value, validateLength, [3]);
                }}
                placeholder="New SID"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              label="Name"
              colon={false}
              validateStatus={name.validateStatus}
              help={name.errorMsg}
            >
              <Input
                value={name.value}
                onChange={(e) => {
                  this.handleInputChange('name', e.target.value, validateLength, [3]);
                }}
                placeholder="Student name"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>

          </Col>
        </Row>
        <Row>
          <Col span={24}>
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
          </Col>
        </Row>


      </Form>
    );
  }
}

StudentForm.propTypes = {
  updateStudentForm: PropTypes.func.isRequired,
  studentForm: PropTypes.shape({
    oldSid: PropTypes.string.isRequired,
    newSid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudentForm;
