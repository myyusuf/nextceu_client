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

const AddCourseByLevelForm = ({ addCourseByLevelForm, addCourseByLevelFormChanged }) => (
  <Form>
    <Row gutter={10}>
      <Col span={8}>
        <FormItem
          label="Level"
          colon={false}
          validateStatus={addCourseByLevelForm.level.validateStatus}
          help={addCourseByLevelForm.level.errorMsg}
        >
          <DepartmentLevelSelect
            value={addCourseByLevelForm.level.value}
            onSelect={(value) => {
              addCourseByLevelFormChanged({
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
          validateStatus={addCourseByLevelForm.startDate.validateStatus}
          help={addCourseByLevelForm.startDate.errorMsg}
        >
          <DatePicker
            value={addCourseByLevelForm.startDate.value}
            onChange={(date) => {
              this.handleInputChange('startDate', date);
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="Suffix"
          colon={false}
          validateStatus={addCourseByLevelForm.suffix.validateStatus}
          help={addCourseByLevelForm.suffix.errorMsg}
        >
          <Input
            value={addCourseByLevelForm.suffix.value}
            onChange={(e) => {
              addCourseByLevelFormChanged({
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

AddCourseByLevelForm.propTypes = {
  addCourseByLevelFormChanged: PropTypes.func.isRequired,
  addCourseByLevelForm: PropTypes.shape({
    level: PropTypes.shape.isRequired,
    startDate: PropTypes.shape.isRequired,
    suffix: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    addCourseByLevelForm: state.studentReducers.addCourseByLevelForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    addCourseByLevelFormChanged: (payload) => {
      dispatch({
        type: 'ADD_COURSE_BY_LEVEL_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const AddCourseByLevelFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseByLevelForm);

export default AddCourseByLevelFormWrapper;
