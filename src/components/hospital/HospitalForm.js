import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const HospitalForm = ({ code, name, hospitalFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={code.validateStatus}
          help={code.errorMsg}
        >
          <Input
            value={code.value}
            onChange={(e) => {
              hospitalFormChanged({
                name: 'code',
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
          validateStatus={name.validateStatus}
          help={name.errorMsg}
        >
          <Input
            value={name.value}
            onChange={(e) => {
              hospitalFormChanged({
                name: 'name',
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
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default HospitalForm;
