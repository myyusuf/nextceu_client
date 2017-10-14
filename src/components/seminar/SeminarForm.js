import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import InputNumber from 'antd/lib/input-number';
import SupervisorSelect from '../supervisor/SupervisorSelect';
import DepartmentSelect from '../department/DepartmentSelect';
import SmtSelect from './smt/SmtSelect';

const FormItem = Form.Item;

const SeminarForm = ({ seminarForm, seminarFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={seminarForm.code.validateStatus}
          help={seminarForm.code.errorMsg}
        >
          <Input
            value={seminarForm.code.value}
            onChange={(e) => {
              seminarFormChanged({
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
          validateStatus={seminarForm.name.validateStatus}
          help={seminarForm.name.errorMsg}
        >
          <Input
            value={seminarForm.name.value}
            onChange={(e) => {
              seminarFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
          />
        </FormItem>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <FormItem
          label="Department"
          colon={false}
        >
          <DepartmentSelect
            onChange={(value) => {
              //
            }}
          />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          label="Seminar Type"
          colon={false}
          validateStatus={seminarForm.seminarType.validateStatus}
          help={seminarForm.seminarType.errorMsg}
        >
          <SmtSelect
            value={seminarForm.seminarType.value}
            onChange={(value) => {
              seminarFormChanged({
                key: 'seminarType',
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
          label="Duration"
          colon={false}
          validateStatus={seminarForm.duration.validateStatus}
          help={seminarForm.duration.errorMsg}
        >
          <InputNumber
            min={1}
            max={10}
            value={seminarForm.duration.value}
            onChange={(value) => {
              seminarFormChanged({
                key: 'duration',
                value,
              });
            }}
            style={{ width: 120 }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <FormItem
          label="Date"
          colon={false}
          validateStatus={seminarForm.eventDate.validateStatus}
          help={seminarForm.eventDate.errorMsg}
        >
          <DatePicker
            value={seminarForm.eventDate.value}
            onChange={(date) => {
              seminarFormChanged({
                key: 'eventDate',
                value: date,
              });
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          label="Time"
          colon={false}
          validateStatus={seminarForm.eventTime.validateStatus}
          help={seminarForm.eventTime.errorMsg}
        >
          <TimePicker
            value={seminarForm.eventTime.value}
            onChange={(date) => {
              seminarFormChanged({
                key: 'eventTime',
                value: date,
              });
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <FormItem
          label="Speaker"
          colon={false}
          validateStatus={seminarForm.speaker.validateStatus}
          help={seminarForm.speaker.errorMsg}
        >
          <SupervisorSelect
            value={seminarForm.speaker.value}
            onChange={(value) => {
              seminarFormChanged({
                key: 'speaker',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          label="Moderator"
          colon={false}
          validateStatus={seminarForm.moderator.validateStatus}
          help={seminarForm.moderator.errorMsg}
        >
          <SupervisorSelect
            value={seminarForm.moderator.value}
            onChange={(value) => {
              seminarFormChanged({
                key: 'moderator',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

SeminarForm.propTypes = {
  seminarFormChanged: PropTypes.func.isRequired,
  seminarForm: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    seminarForm: state.seminarReducers.seminarForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    seminarFormChanged: (payload) => {
      dispatch({
        type: 'SEMINAR_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const SeminarFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarForm);

export default SeminarFormWrapper;
