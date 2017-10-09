import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import DepartmentSelect from '../../department/DepartmentSelect';

const FormItem = Form.Item;

const SmtForm = ({ smtForm, smtFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={smtForm.code.validateStatus}
          help={smtForm.code.errorMsg}
        >
          <Input
            value={smtForm.code.value}
            onChange={(e) => {
              smtFormChanged({
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
          validateStatus={smtForm.name.validateStatus}
          help={smtForm.name.errorMsg}
        >
          <Input
            value={smtForm.name.value}
            onChange={(e) => {
              smtFormChanged({
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
          validateStatus={smtForm.department.validateStatus}
          help={smtForm.department.errorMsg}
        >
          <DepartmentSelect
            value={smtForm.department.value}
            onSelect={(value) => {
              smtFormChanged({
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
          validateStatus={smtForm.active.validateStatus}
          help={smtForm.active.errorMsg}
        >
          <Checkbox
            checked={smtForm.active.value}
            onChange={(e) => {
              smtFormChanged({
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

SmtForm.propTypes = {
  smtFormChanged: PropTypes.func.isRequired,
  smtForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    smtForm: state.seminarReducers.smtForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    smtFormChanged: (payload) => {
      dispatch({
        type: 'SMT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const SmtFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmtForm);

export default SmtFormWrapper;
