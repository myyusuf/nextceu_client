import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import * as actions from '../../../actions/ActionType';

const FormItem = Form.Item;

const InitiateXptForm = ({ initiateXptForm, initiateXptFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Pre Test Date"
          colon={false}
          validateStatus={initiateXptForm.preTestDate.validateStatus}
          help={initiateXptForm.preTestDate.errorMsg}
        >
          <DatePicker
            value={initiateXptForm.preTestDate.value}
            onChange={(date) => {
              initiateXptFormChanged({
                key: 'preTestDate',
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

InitiateXptForm.propTypes = {
  initiateXptFormChanged: PropTypes.func.isRequired,
  initiateXptForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    initiateXptForm: state.reportReducers.initiateXptForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    initiateXptFormChanged: (payload) => {
      dispatch({
        type: actions.report.student.initiateXpt.form.changed,
        payload,
      });
    },
  }
);

const InitiateXptFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitiateXptForm);

export default InitiateXptFormWrapper;
