import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

const Option = Select.Option;

const FormItem = Form.Item;

const CourseForm = ({ courseForm, courseFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={12}>
            <FormItem
              label="Title"
              colon={false}
              validateStatus={courseForm.title.validateStatus}
              help={courseForm.title.errorMsg}
            >
              <Input
                value={courseForm.title.value}
                onChange={(e) => {
                  courseFormChanged({
                    key: 'title',
                    value: e.target.value,
                  });
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
              validateStatus={courseForm.completion.validateStatus}
              help={courseForm.completion.errorMsg}
            >
              <Select
                defaultValue="0"
                value={courseForm.completion.value}
                style={{ width: 120 }}
                onChange={(value) => {
                  courseFormChanged({
                    key: 'completion',
                    value,
                  });
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

CourseForm.propTypes = {
  courseFormChanged: PropTypes.func.isRequired,
  courseForm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completion: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    courseForm: state.studentReducers.courseForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    courseFormChanged: (payload) => {
      dispatch(dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload,
      }));
    },
  }
);

const CourseFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseForm);

export default CourseFormWrapper;
