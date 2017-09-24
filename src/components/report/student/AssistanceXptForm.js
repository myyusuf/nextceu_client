import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import * as actions from '../../../actions/ActionType';

const FormItem = Form.Item;

const AssistanceXptForm = ({ assistanceXptForm, assistanceXptFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Pre Test Date"
          colon={false}
          validateStatus={assistanceXptForm.preTestDate.validateStatus}
          help={assistanceXptForm.preTestDate.errorMsg}
        >
          <DatePicker
            value={assistanceXptForm.preTestDate.value}
            onChange={(date) => {
              assistanceXptFormChanged({
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

AssistanceXptForm.propTypes = {
  assistanceXptFormChanged: PropTypes.func.isRequired,
  assistanceXptForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    assistanceXptForm: state.reportReducers.assistanceXptForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    assistanceXptFormChanged: (payload) => {
      dispatch({
        type: actions.report.student.assistanceXpt.form.changed,
        payload,
      });
    },
  }
);

const AssistanceXptFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssistanceXptForm);

export default AssistanceXptFormWrapper;
