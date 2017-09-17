import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import DepartmentSelect from '../../../department/DepartmentSelect';

const FormItem = Form.Item;

const SgtForm = ({ sgtForm, sgtFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={sgtForm.code.validateStatus}
          help={sgtForm.code.errorMsg}
        >
          <Input
            value={sgtForm.code.value}
            onChange={(e) => {
              sgtFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
            maxLength={20}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={sgtForm.name.validateStatus}
          help={sgtForm.name.errorMsg}
        >
          <Input
            value={sgtForm.name.value}
            onChange={(e) => {
              sgtFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={150}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Department"
          colon={false}
          validateStatus={sgtForm.department.validateStatus}
          help={sgtForm.department.errorMsg}
        >
          <DepartmentSelect
            value={sgtForm.department.value}
            onSelect={(value) => {
              sgtFormChanged({
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
          colon={false}
          validateStatus={sgtForm.active.validateStatus}
          help={sgtForm.active.errorMsg}
        >
          <Checkbox
            checked={sgtForm.active.value}
            onChange={(e) => {
              sgtFormChanged({
                key: 'active',
                value: e.target.checked,
              });
            }}
          >
            Active
          </Checkbox>
        </FormItem>
      </Col>
    </Row>
  </Form>
);

SgtForm.propTypes = {
  sgtFormChanged: PropTypes.func.isRequired,
  sgtForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    sgtForm: state.studentReducers.sgtForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    sgtFormChanged: (payload) => {
      dispatch({
        type: 'SGT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const SgtFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SgtForm);

export default SgtFormWrapper;
