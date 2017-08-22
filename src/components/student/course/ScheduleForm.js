import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';

const RangePicker = DatePicker.RangePicker;

const Option = Select.Option;

const FormItem = Form.Item;

class ScheduleForm extends Component {

  handleInputChange = (name, value) => {
    this.props.scheduleFormChanged({
      key: name,
      value,
    });
  }

  render() {
    const { planDate, realStartDate, realEndDate } = this.props.scheduleForm;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <FormItem
                  label="Plan Date"
                  colon={false}
                  validateStatus={planDate.validateStatus}
                  help={planDate.errorMsg}
                >
                  <RangePicker
                    value={planDate.value}
                    onChange={(date, dateString) => {
                      this.handleInputChange('planDate', date);
                    }}
                  />

                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem
                  label="Real Start Date"
                  colon={false}
                  validateStatus={realStartDate.validateStatus}
                  help={realStartDate.errorMsg}
                >
                  <DatePicker
                    value={realStartDate.value}
                    onChange={(date, dateString) => {
                      this.handleInputChange('realStartDate', date);
                    }}
                  />

                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label="Real End Date"
                  colon={false}
                  validateStatus={realEndDate.validateStatus}
                  help={realEndDate.errorMsg}
                >
                  <DatePicker
                    value={realEndDate.value}
                    onChange={(date, dateString) => {
                      this.handleInputChange('realEndDate', date);
                    }}
                  />

                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

ScheduleForm.propTypes = {
  scheduleFormChanged: PropTypes.func.isRequired,
  scheduleForm: PropTypes.shape({
    planDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    realStartDate: PropTypes.instanceOf(Date),
  }).isRequired,
};

const mapStateToProps = state => (
  {
    scheduleForm: state.studentReducers.scheduleForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    scheduleFormChanged: (schedule) => {
      dispatch({
        type: 'SCHEDULE_FORM_CHANGED',
        payload: schedule,
      });
    },
  }
);

const ScheduleFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleForm);

export default ScheduleFormWrapper;
