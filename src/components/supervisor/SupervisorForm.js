import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const SupervisorForm = ({ supervisorForm, supervisorFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={supervisorForm.code.validateStatus}
          help={supervisorForm.code.errorMsg}
        >
          <Input
            value={supervisorForm.code.value}
            onChange={(e) => {
              supervisorFormChanged({
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
          validateStatus={supervisorForm.name.validateStatus}
          help={supervisorForm.name.errorMsg}
        >
          <Input
            value={supervisorForm.name.value}
            onChange={(e) => {
              supervisorFormChanged({
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
  </Form>
);

SupervisorForm.propTypes = {
  supervisorFormChanged: PropTypes.func.isRequired,
  supervisorForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    supervisorForm: state.supervisorReducers.supervisorForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    supervisorFormChanged: (payload) => {
      dispatch({
        type: 'SUPERVISOR_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const SupervisorFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupervisorForm);

export default SupervisorFormWrapper;
