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
      <Col span={24}>
        <FormItem
          label="Department"
          colon={false}
          validateStatus={hospitalDepartmentForm.department.validateStatus}
          help={hospitalDepartmentForm.department.errorMsg}
        >
          <DepartmentSelect
            value={hospitalDepartmentForm.department}
            onSelect={(value) => {
              hospitalDepartmentFormChanged({
                name: 'department',
                value,
              });
            }}
            style={{ width: 200, marginBottom: 20 }}
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
            max={10}
            onChange={(e) => {
              hospitalDepartmentFormChanged({
                name: 'quota',
                value: e.target.value,
              });
            }}
            style={{ width: 250 }}
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
    quota: PropTypes.number.isRequired,
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
