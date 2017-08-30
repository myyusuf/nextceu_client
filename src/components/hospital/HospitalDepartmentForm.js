import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import DepartmentSelect from '../../components/department/DepartmentSelect';

const FormItem = Form.Item;

const HospitalDepartmentForm = ({ hospitalDepartmentForm, hospitalDepartmentFormChanged }) => (
  <Form>
    <Row>
      <Col span={12}>
        <FormItem
          label="Department"
          colon={false}
          validateStatus={hospitalDepartmentForm.department.validateStatus}
          help={hospitalDepartmentForm.department.errorMsg}
        >
          <DepartmentSelect
            value={hospitalDepartmentForm.department.value}
            onSelect={(value) => {
              hospitalDepartmentFormChanged({
                key: 'department',
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
          label="Quota"
          colon={false}
          validateStatus={hospitalDepartmentForm.quota.validateStatus}
          help={hospitalDepartmentForm.quota.errorMsg}
        >
          <InputNumber
            min={0}
            max={300}
            value={hospitalDepartmentForm.quota.value}
            onChange={(value) => {
              hospitalDepartmentFormChanged({
                key: 'quota',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

HospitalDepartmentForm.propTypes = {
  hospitalDepartmentFormChanged: PropTypes.func.isRequired,
  hospitalDepartmentForm: PropTypes.shape({
    department: PropTypes.shape.isRequired,
    quota: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    hospitalDepartmentForm: state.hospitalReducers.hospitalDepartmentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    hospitalDepartmentFormChanged: (payload) => {
      dispatch({
        type: 'HOSPITAL_DEPARTMENT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const HospitalDepartmentFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalDepartmentForm);

export default HospitalDepartmentFormWrapper;
