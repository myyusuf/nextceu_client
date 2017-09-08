import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';

const FormItem = Form.Item;

const ExportToPreTestForm = ({ exportToPreTestForm, exportToPreTestFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Pre Test Date"
          colon={false}
          validateStatus={exportToPreTestForm.preTestDate.validateStatus}
          help={exportToPreTestForm.preTestDate.errorMsg}
        >
          <DatePicker
            value={exportToPreTestForm.preTestDate.value}
            onChange={(date) => {
              exportToPreTestFormChanged({
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

ExportToPreTestForm.propTypes = {
  exportToPreTestFormChanged: PropTypes.func.isRequired,
  exportToPreTestForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    exportToPreTestForm: state.reportReducers.exportToPreTestForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    exportToPreTestFormChanged: (payload) => {
      dispatch({
        type: 'EXPORT_TO_PRE_TEST_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const ExportToPreTestFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportToPreTestForm);

export default ExportToPreTestFormWrapper;
