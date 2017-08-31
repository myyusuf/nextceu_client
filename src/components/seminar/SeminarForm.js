import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';

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
    <Row>
      <Col span={24}>
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
