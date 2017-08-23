import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import Tabs from 'antd/lib/tabs';

const RangePicker = DatePicker.RangePicker;

const Option = Select.Option;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class ScheduleForm extends Component {

  handleInputChange = (name, value) => {
    this.props.scheduleFormChanged({
      key: name,
      value,
    });
  }

  render() {
    const {
      planDate,
      realStartDate,
      realEndDate,
      planDate1,
      realStartDate1,
      realEndDate1,
    } = this.props.scheduleForm;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Main" key="1">
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
              </TabPane>
              <TabPane tab="Hospital 1" key="2">
                <Row>
                  <Col span={12}>
                    <FormItem
                      label="Hospital Plan Date"
                      colon={false}
                      validateStatus={planDate1.validateStatus}
                      help={planDate1.errorMsg}
                    >
                      <RangePicker
                        value={planDate1.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('planDate1', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem
                      label="Hospital Real Start Date"
                      colon={false}
                      validateStatus={realStartDate1.validateStatus}
                      help={realStartDate1.errorMsg}
                    >
                      <DatePicker
                        value={realStartDate1.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('realStartDate1', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      label="Hospital Real End Date"
                      colon={false}
                      validateStatus={realEndDate1.validateStatus}
                      help={realEndDate1.errorMsg}
                    >
                      <DatePicker
                        value={realEndDate1.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('realEndDate1', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Clinic" key="4">Content of Tab Pane 4</TabPane>
              <TabPane tab="Hospital 2" key="5">Content of Tab Pane 5</TabPane>
            </Tabs>
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
    realEndDate: PropTypes.instanceOf(Date),
    planDate1: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    realStartDate1: PropTypes.instanceOf(Date),
    realEndDate1: PropTypes.instanceOf(Date),
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
