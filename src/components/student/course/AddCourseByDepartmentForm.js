import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import DepartmentLevelSelect from '../../department/DepartmentLevelSelect';

const FormItem = Form.Item;

const AddCourseByDepartmentForm = ({ addCourseByDepartmentForm, addCourseByDepartmentFormChanged }) => (
  <Form>
    <Row>
      <Col span={8}>
        <FormItem
          label="Department"
          colon={false}
          validateStatus={addCourseByDepartmentForm.level.validateStatus}
          help={addCourseByDepartmentForm.level.errorMsg}
        >
          <DepartmentLevelSelect
            value={addCourseByDepartmentForm.level.value}
            onSelect={(value) => {
              addCourseByDepartmentFormChanged({
                key: 'level',
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
              this.handleInputChange('startDate', date);
            }}
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="Suffix"
          colon={false}
          validateStatus={addCourseByDepartmentForm.suffix.validateStatus}
          help={addCourseByDepartmentForm.suffix.errorMsg}
        >
          <Input
            value={addCourseByDepartmentForm.suffix.value}
            onChange={(e) => {
              addCourseByDepartmentFormChanged({
                key: 'suffix',
                value: e.target.value,
              });
            }}
            placeholder="Suffix"
            maxLength={7}
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
    suffix: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    addCourseByDepartmentForm: state.addCourseByDepartmentReducers.addCourseByDepartmentForm,
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
