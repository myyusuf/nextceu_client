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
    <Row gutter={10}>
      <Col span={12}>
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
            maxLength={5}
          />
        </FormItem>
      </Col>
      <Col span={12}>
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
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
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
            style={{ width: 120 }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <FormItem
          label="Hospital Duration 1"
          colon={false}
          validateStatus={departmentForm.duration1.validateStatus}
          help={departmentForm.duration1.errorMsg}
        >
          <InputNumber
            min={1}
            max={10}
            value={departmentForm.duration1.value}
            onChange={(value) => {
              departmentFormChanged({
                key: 'duration1',
                value,
              });
            }}
            style={{ width: 120 }}
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="Clinic Duration"
          colon={false}
          validateStatus={departmentForm.duration2.validateStatus}
          help={departmentForm.duration2.errorMsg}
        >
          <InputNumber
            min={0}
            max={10}
            value={departmentForm.duration2.value}
            onChange={(value) => {
              departmentFormChanged({
                key: 'duration2',
                value,
              });
            }}
            style={{ width: 120 }}
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="Hospital Duration 2"
          colon={false}
          validateStatus={departmentForm.duration3.validateStatus}
          help={departmentForm.duration3.errorMsg}
        >
          <InputNumber
            min={0}
            max={10}
            value={departmentForm.duration3.value}
            onChange={(value) => {
              departmentFormChanged({
                key: 'duration3',
                value,
              });
            }}
            style={{ width: 120 }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Seminars Count"
          colon={false}
          validateStatus={departmentForm.seminarsCount.validateStatus}
          help={departmentForm.seminarsCount.errorMsg}
        >
          <InputNumber
            min={1}
            max={10}
            value={departmentForm.seminarsCount.value}
            onChange={(value) => {
              departmentFormChanged({
                key: 'seminarsCount',
                value,
              });
            }}
            style={{ width: 120 }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <FormItem
          label="Color"
          colon={false}
          validateStatus={departmentForm.color.validateStatus}
          help={departmentForm.color.errorMsg}
        >
          <Input
            value={departmentForm.color.value}
            onChange={(e) => {
              departmentFormChanged({
                key: 'color',
                value: e.target.value,
              });
            }}
            placeholder="Color"
            maxLength={7}
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
