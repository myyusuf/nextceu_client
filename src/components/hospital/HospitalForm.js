import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const HospitalForm = ({ hospitalForm, hospitalFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={hospitalForm.code.validateStatus}
          help={hospitalForm.code.errorMsg}
        >
          <Input
            value={hospitalForm.code.value}
            onChange={(e) => {
              hospitalFormChanged({
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
          validateStatus={hospitalForm.name.validateStatus}
          help={hospitalForm.name.errorMsg}
        >
          <Input
            value={hospitalForm.name.value}
            onChange={(e) => {
              hospitalFormChanged({
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

HospitalForm.propTypes = {
  hospitalFormChanged: PropTypes.func.isRequired,
  hospitalForm: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    hospitalForm: state.hospitalReducers.hospitalForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    hospitalFormChanged: (payload) => {
      dispatch({
        type: 'HOSPITAL_FORM_CHANGED',
        payload,
      });
    },
  }
);

const HospitalFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalForm);

export default HospitalFormWrapper;
