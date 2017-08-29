import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import HospitalTypeSelect from './HospitalTypeSelect';

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
    <Row>
      <Col span={24}>
        <FormItem
          label="Type"
          colon={false}
          validateStatus={hospitalForm.hospitalType.validateStatus}
          help={hospitalForm.hospitalType.errorMsg}
        >
          <HospitalTypeSelect
            value={hospitalForm.hospitalType.value}
            onSelect={(value) => {
              hospitalFormChanged({
                key: 'hospitalType',
                value,
              });
            }}
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
export default HospitalForm;
