import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

class CourseForm extends Component {

  handleInputChange = (name, value) => {
    this.props.courseFormChanged({
      key: name,
      value,
    });
  }

  render() {
    const { title } = this.props.courseForm;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <FormItem
              label="Title"
              colon={false}
              validateStatus={title.validateStatus}
              help={title.errorMsg}
            >
              <Input
                value={title.value}
                onChange={(e) => {
                  this.handleInputChange('title', e.target.value);
                }}
                placeholder="Title"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

CourseForm.propTypes = {
  courseFormChanged: PropTypes.func.isRequired,
  courseForm: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseForm;
