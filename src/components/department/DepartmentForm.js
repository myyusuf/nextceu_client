import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import DepartmentLevelSelect from './DepartmentLevelSelect';

const FormItem = Form.Item;

const DepartmentForm = ({ departmentForm, departmentFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={departmentForm.code.validateStatus}
          help={departmentForm.code.errorMsg}
        >
          <Input
            value={departmentForm.code.value}
            onChange={(e) => {
              departmentFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={departmentForm.name.validateStatus}
          help={departmentForm.name.errorMsg}
        >
          <Input
            value={departmentForm.name.value}
            onChange={(e) => {
              departmentFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Level"
          colon={false}
          validateStatus={departmentForm.level.validateStatus}
          help={departmentForm.level.errorMsg}
        >
          <DepartmentLevelSelect
            value={departmentForm.level.value}
            onSelect={(value) => {
              departmentFormChanged({
                key: 'level',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Duration"
          colon={false}
          validateStatus={departmentForm.duration.validateStatus}
          help={departmentForm.duration.errorMsg}
        >
          <InputNumber
            min={1}
            max={10}
            value={departmentForm.duration.value}
            onChange={(value) => {
              departmentFormChanged({
                key: 'duration',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

DepartmentForm.propTypes = {
  departmentFormChanged: PropTypes.func.isRequired,
  departmentForm: PropTypes.shape({
    code: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
    level: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    departmentForm: state.departmentReducers.departmentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    departmentFormChanged: (payload) => {
      dispatch({
        type: 'DEPARTMENT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const DepartmentFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentForm);

export default DepartmentFormWrapper;
