import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

import HospitalSelect from '../hospital/HospitalSelect';
import DepartmentSelect from '../department/DepartmentSelect';

const FormItem = Form.Item;

const DocentForm = ({ docentForm, docentFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={docentForm.code.validateStatus}
          help={docentForm.code.errorMsg}
        >
          <Input
            value={docentForm.code.value}
            onChange={(e) => {
              docentFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={docentForm.name.validateStatus}
          help={docentForm.name.errorMsg}
        >
          <Input
            value={docentForm.name.value}
            onChange={(e) => {
              docentFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={50}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Hospital"
          colon={false}
          validateStatus={docentForm.hospital.validateStatus}
          help={docentForm.hospital.errorMsg}
        >
          <HospitalSelect
            value={docentForm.hospital.value}
            onSelect={(value) => {
              docentFormChanged({
                key: 'hospital',
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
          label="Department"
          colon={false}
          validateStatus={docentForm.department.validateStatus}
          help={docentForm.department.errorMsg}
        >
          <DepartmentSelect
            value={docentForm.department.value}
            onSelect={(value) => {
              docentFormChanged({
                key: 'department',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

DocentForm.propTypes = {
  docentFormChanged: PropTypes.func.isRequired,
  docentForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    docentForm: state.docentReducers.docentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    docentFormChanged: (payload) => {
      dispatch({
        type: 'DOCENT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const DocentFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocentForm);

export default DocentFormWrapper;
