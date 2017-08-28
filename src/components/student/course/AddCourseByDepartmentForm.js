import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import DepartmentSelect from '../../department/DepartmentSelect';

const FormItem = Form.Item;

const AddCourseByDepartmentForm =
({ addCourseByDepartmentForm, addCourseByDepartmentFormChanged }) => (
  <Form>
    <Row gutter={10}>
      <Col span={8}>
        <FormItem
          label="Department"
          colon={false}
          validateStatus={addCourseByDepartmentForm.department.validateStatus}
          help={addCourseByDepartmentForm.department.errorMsg}
        >
          <DepartmentSelect
            value={addCourseByDepartmentForm.department.value}
            onSelect={(value) => {
              addCourseByDepartmentFormChanged({
                key: 'department',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="Start Date"
          colon={false}
          validateStatus={addCourseByDepartmentForm.startDate.validateStatus}
          help={addCourseByDepartmentForm.startDate.errorMsg}
        >
          <DatePicker
            value={addCourseByDepartmentForm.startDate.value}
            onChange={(date) => {
              addCourseByDepartmentFormChanged({
                key: 'startDate',
                value: date,
              });
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="Title"
          colon={false}
          validateStatus={addCourseByDepartmentForm.title.validateStatus}
          help={addCourseByDepartmentForm.title.errorMsg}
        >
          <Input
            value={addCourseByDepartmentForm.title.value}
            onChange={(e) => {
              addCourseByDepartmentFormChanged({
                key: 'title',
                value: e.target.value,
              });
            }}
            placeholder="Title"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

AddCourseByDepartmentForm.propTypes = {
  addCourseByDepartmentFormChanged: PropTypes.func.isRequired,
  addCourseByDepartmentForm: PropTypes.shape({
    level: PropTypes.shape.isRequired,
    startDate: PropTypes.shape.isRequired,
    title: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    addCourseByDepartmentForm: state.studentReducers.addCourseByDepartmentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    addCourseByDepartmentFormChanged: (payload) => {
      dispatch({
        type: 'ADD_COURSE_BY_DEPARTMENT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const AddCourseByDepartmentFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseByDepartmentForm);

export default AddCourseByDepartmentFormWrapper;
