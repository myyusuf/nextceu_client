import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

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
  </Form>
);

DepartmentForm.propTypes = {
  departmentFormChanged: PropTypes.func.isRequired,
  departmentForm: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
        type: 'DEPARTMENT_FORM_CHANGED',
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
