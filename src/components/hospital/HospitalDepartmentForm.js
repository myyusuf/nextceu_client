import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';

const FormItem = Form.Item;

const HospitalDepartmentForm = ({ quota, hospitalDepartmentFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Quota"
          colon={false}
          validateStatus={quota.validateStatus}
          help={quota.errorMsg}
        >
          <InputNumber
            min={0}
            max={10}
            onChange={(e) => {
              hospitalDepartmentFormChanged({
                name: 'quota',
                value: e.target.value,
              });
            }}
            style={{ width: 250 }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

HospitalDepartmentForm.propTypes = {
  hospitalDepartmentFormChanged: PropTypes.func.isRequired,
  quota: PropTypes.number.isRequired,
};

export default HospitalDepartmentForm;
