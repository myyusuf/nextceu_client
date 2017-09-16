import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DepartmentSelect from '../../../department/DepartmentSelect';

const FormItem = Form.Item;

const PftForm = ({ pftForm, pftFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={pftForm.code.validateStatus}
          help={pftForm.code.errorMsg}
        >
          <Input
            value={pftForm.code.value}
            onChange={(e) => {
              pftFormChanged({
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
          validateStatus={pftForm.name.validateStatus}
          help={pftForm.name.errorMsg}
        >
          <Input
            value={pftForm.name.value}
            onChange={(e) => {
              pftFormChanged({
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
          validateStatus={pftForm.department.validateStatus}
          help={pftForm.department.errorMsg}
        >
          <DepartmentSelect
            value={pftForm.department.value}
            onSelect={(value) => {
              pftFormChanged({
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

PftForm.propTypes = {
  pftFormChanged: PropTypes.func.isRequired,
  pftForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    pftForm: state.studentReducers.pftForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    pftFormChanged: (payload) => {
      dispatch({
        type: 'PFT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const PftFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PftForm);

export default PftFormWrapper;
