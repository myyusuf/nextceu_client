import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import UserSelect from '../user/UserSelect';
import HospitalSelect from '../hospital/HospitalSelect';

const FormItem = Form.Item;

const HospitalUserForm = ({ hospitalUserForm, hospitalUserFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="User"
          colon={false}
          validateStatus={hospitalUserForm.user.validateStatus}
          help={hospitalUserForm.user.errorMsg}
        >
          <UserSelect
            value={hospitalUserForm.user.value}
            onSelect={(value) => {
              hospitalUserFormChanged({
                key: 'user',
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
          label="Hospital"
          colon={false}
          validateStatus={hospitalUserForm.hospital.validateStatus}
          help={hospitalUserForm.hospital.errorMsg}
        >
          <HospitalSelect
            value={hospitalUserForm.hospital.value}
            onSelect={(value) => {
              hospitalUserFormChanged({
                key: 'hospital',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

HospitalUserForm.propTypes = {
  hospitalUserFormChanged: PropTypes.func.isRequired,
  hospitalUserForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    hospitalUserForm: state.settingsReducers.hospitalUserForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    hospitalUserFormChanged: (payload) => {
      dispatch({
        type: 'HOSPITAL_USER_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const HospitalUserFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalUserForm);

export default HospitalUserFormWrapper;
