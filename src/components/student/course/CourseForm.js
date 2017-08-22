import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

const Option = Select.Option;

const FormItem = Form.Item;

class CourseForm extends Component {

  handleInputChange = (name, value) => {
    this.props.courseFormChanged({
      key: name,
      value,
    });
  }

  render() {
    const { title, completion } = this.props.courseForm;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
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

            <Row>
              <Col span={12}>
                <FormItem
                  label="Completion"
                  colon={false}
                  validateStatus={completion.validateStatus}
                  help={completion.errorMsg}
                >
                  <Select
                    defaultValue="0"
                    value={completion.value}
                    style={{ width: 120 }}
                    onChange={(value, label) => {
                      this.handleInputChange('completion', value);
                    }}
                  >
                    <Option value={0}>0 %</Option>
                    <Option value={25}>25 %</Option>
                    <Option value={50}>50 %</Option>
                    <Option value={75}>75 %</Option>
                    <Option value={100}>100 %</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
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
    completion: PropTypes.number.isRequired,
  }).isRequired,
};

export default CourseForm;
