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
import Button from 'antd/lib/button';

const RangePicker = DatePicker.RangePicker;

const Option = Select.Option;
const InputGroup = Input.Group;

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
      planDate2,
      realStartDate2,
      realEndDate2,
      planDate3,
      realStartDate3,
      realEndDate3,
      hospital1,
      clinic,
    } = this.props.scheduleForm;

    const hospitalName = hospital1.value ? hospital1.value.name : '';
    const clinicName = clinic.value ? clinic.value.name : '';

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
                      label="Start Date"
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
                      label="End Date"
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
                      label="Plan Date"
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
                      label="Start Date"
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
                      label="End Date"
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
                <Row>
                  <Col span={12}>
                    <FormItem
                      label="Hospital 1"
                      colon={false}
                      validateStatus={hospital1.validateStatus}
                      help={hospital1.errorMsg}
                    >
                      <InputGroup size="large">
                        <Col span={16}>
                          <Input
                            value={hospitalName}
                            placeholder="Select Hospital"
                          />
                        </Col>
                        <Col span={8}>
                          <Button icon="select" style={{ height: 32 }}></Button>
                        </Col>
                      </InputGroup>

                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Clinic" key="3">
                <Row>
                  <Col span={12}>
                    <FormItem
                      label="Plan Date"
                      colon={false}
                      validateStatus={planDate2.validateStatus}
                      help={planDate2.errorMsg}
                    >
                      <RangePicker
                        value={planDate2.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('planDate2', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem
                      label="Start Date"
                      colon={false}
                      validateStatus={realStartDate2.validateStatus}
                      help={realStartDate2.errorMsg}
                    >
                      <DatePicker
                        value={realStartDate2.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('realStartDate2', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      label="End Date"
                      colon={false}
                      validateStatus={realEndDate2.validateStatus}
                      help={realEndDate2.errorMsg}
                    >
                      <DatePicker
                        value={realEndDate2.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('realEndDate2', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem
                      label="Clinic"
                      colon={false}
                      validateStatus={hospital1.validateStatus}
                      help={hospital1.errorMsg}
                    >
                      <InputGroup size="large">
                        <Col span={16}>
                          <Input
                            value={clinicName}
                            placeholder="Select Clinic"
                          />
                        </Col>
                        <Col span={8}>
                          <Button icon="select" style={{ height: 32 }}></Button>
                        </Col>
                      </InputGroup>

                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Hospital 2" key="4">
                <Row>
                  <Col span={12}>
                    <FormItem
                      label="Plan Date"
                      colon={false}
                      validateStatus={planDate3.validateStatus}
                      help={planDate3.errorMsg}
                    >
                      <RangePicker
                        value={planDate3.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('planDate3', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem
                      label="Start Date"
                      colon={false}
                      validateStatus={realStartDate3.validateStatus}
                      help={realStartDate3.errorMsg}
                    >
                      <DatePicker
                        value={realStartDate3.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('realStartDate3', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      label="End Date"
                      colon={false}
                      validateStatus={realEndDate3.validateStatus}
                      help={realEndDate3.errorMsg}
                    >
                      <DatePicker
                        value={realEndDate3.value}
                        onChange={(date, dateString) => {
                          this.handleInputChange('realEndDate3', date);
                        }}
                      />

                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
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
    planDate2: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    realStartDate2: PropTypes.instanceOf(Date),
    realEndDate2: PropTypes.instanceOf(Date),
    planDate3: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    realStartDate3: PropTypes.instanceOf(Date),
    realEndDate3: PropTypes.instanceOf(Date),
    hospital1: PropTypes.shape.isRequired,
    clinic: PropTypes.shape.isRequired,
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
