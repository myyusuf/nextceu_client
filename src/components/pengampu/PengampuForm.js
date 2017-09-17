import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

import DepartmentSelect from '../department/DepartmentSelect';

const FormItem = Form.Item;

const PengampuForm = ({ pengampuForm, pengampuFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={pengampuForm.code.validateStatus}
          help={pengampuForm.code.errorMsg}
        >
          <Input
            value={pengampuForm.code.value}
            onChange={(e) => {
              pengampuFormChanged({
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
          validateStatus={pengampuForm.name.validateStatus}
          help={pengampuForm.name.errorMsg}
        >
          <Input
            value={pengampuForm.name.value}
            onChange={(e) => {
              pengampuFormChanged({
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
          label="Department"
          colon={false}
          validateStatus={pengampuForm.department.validateStatus}
          help={pengampuForm.department.errorMsg}
        >
          <DepartmentSelect
            value={pengampuForm.department.value}
            onSelect={(value) => {
              pengampuFormChanged({
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

PengampuForm.propTypes = {
  pengampuFormChanged: PropTypes.func.isRequired,
  pengampuForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    pengampuForm: state.pengampuReducers.pengampuForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    pengampuFormChanged: (payload) => {
      dispatch({
        type: 'PENGAMPU_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const PengampuFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PengampuForm);

export default PengampuFormWrapper;
