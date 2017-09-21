import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';

const FormItem = Form.Item;

const AssistanceForm = ({ assistanceForm, assistanceFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={assistanceForm.code.validateStatus}
          help={assistanceForm.code.errorMsg}
        >
          <Input
            value={assistanceForm.code.value}
            onChange={(e) => {
              assistanceFormChanged({
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
          validateStatus={assistanceForm.name.validateStatus}
          help={assistanceForm.name.errorMsg}
        >
          <Input
            value={assistanceForm.name.value}
            onChange={(e) => {
              assistanceFormChanged({
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
      <Col span={12}>
        <FormItem
          label="Date"
          colon={false}
          validateStatus={assistanceForm.eventDate.validateStatus}
          help={assistanceForm.eventDate.errorMsg}
        >
          <DatePicker
            value={assistanceForm.eventDate.value}
            onChange={(date) => {
              assistanceFormChanged({
                key: 'eventDate',
                value: date,
              });
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <FormItem
          label="Time"
          colon={false}
          validateStatus={assistanceForm.eventTime.validateStatus}
          help={assistanceForm.eventTime.errorMsg}
        >
          <TimePicker
            value={assistanceForm.eventTime.value}
            onChange={(date) => {
              assistanceFormChanged({
                key: 'eventTime',
                value: date,
              });
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

AssistanceForm.propTypes = {
  assistanceFormChanged: PropTypes.func.isRequired,
  assistanceForm: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date).isRequired,
    eventTime: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    assistanceForm: state.assistanceReducers.assistanceForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    assistanceFormChanged: (payload) => {
      dispatch({
        type: 'ASSISTANCE_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const AssistanceFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssistanceForm);

export default AssistanceFormWrapper;
