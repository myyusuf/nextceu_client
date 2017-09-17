import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import SglTypeSelect from '../sgt/SgtSelect';
import PengampuSelect from '../../../pengampu/PengampuSelect';

const FormItem = Form.Item;

const SglForm = ({ sglForm, sglFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <FormItem
              label="Type"
              colon={false}
              validateStatus={sglForm.sglType.validateStatus}
              help={sglForm.sglType.errorMsg}
            >
              <SglTypeSelect
                value={sglForm.sglType.value}
                onSelect={(value) => {
                  sglFormChanged({
                    key: 'sglType',
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
              label="Pengampu"
              colon={false}
              validateStatus={sglForm.pengampu.validateStatus}
              help={sglForm.pengampu.errorMsg}
            >
              <PengampuSelect
                value={sglForm.pengampu.value}
                onSelect={(value) => {
                  sglFormChanged({
                    key: 'pengampu',
                    value,
                  });
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label="Date"
              colon={false}
              validateStatus={sglForm.sglDate.validateStatus}
              help={sglForm.sglDate.errorMsg}
            >
              <DatePicker
                value={sglForm.sglDate.value}
                onChange={(date) => {
                  sglFormChanged({
                    key: 'sglDate',
                    value: date,
                  });
                }}
                style={{ width: '100%' }}
              />

            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              colon={false}
              validateStatus={sglForm.completed.validateStatus}
              help={sglForm.completed.errorMsg}
            >
              <Checkbox
                checked={sglForm.completed.value}
                onChange={(e) => {
                  sglFormChanged({
                    key: 'completed',
                    value: e.target.checked,
                  });
                }}
              >
                Completed
              </Checkbox>
            </FormItem>
          </Col>
        </Row>
      </Col>
    </Row>
  </Form>
);

SglForm.propTypes = {
  sglFormChanged: PropTypes.func.isRequired,
  sglForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    sglForm: state.studentReducers.sglForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    sglFormChanged: (payload) => {
      dispatch({
        type: 'SGL_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const SglFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SglForm);


export default SglFormWrapper;
