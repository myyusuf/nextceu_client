import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import Tabs from 'antd/lib/tabs';
import Button from 'antd/lib/button';

const RangePicker = DatePicker.RangePicker;

const InputGroup = Input.Group;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const ScheduleForm = ({ scheduleForm, scheduleFormChanged, showHospitalScheduleWindow, clearField }) => {
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
  } = scheduleForm;
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'planDate',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
                    />

                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={6}>
                  <FormItem
                    label="Start Date"
                    colon={false}
                    validateStatus={realStartDate.validateStatus}
                    help={realStartDate.errorMsg}
                  >
                    <DatePicker
                      value={realStartDate.value}
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realStartDate',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realEndDate',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'planDate1',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
                    />

                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={6}>
                  <FormItem
                    label="Start Date"
                    colon={false}
                    validateStatus={realStartDate1.validateStatus}
                    help={realStartDate1.errorMsg}
                  >
                    <DatePicker
                      value={realStartDate1.value}
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realStartDate1',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realEndDate1',
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
                        <span>
                          <Button
                            icon="close-circle"
                            style={{ height: 32 }}
                            onClick={() => clearField('hospital1')}
                          />
                        </span>
                        <span>
                          <Button
                            icon="select"
                            style={{ height: 32, marginLeft: 5 }}
                            onClick={() => showHospitalScheduleWindow('hospital1')}
                          />
                        </span>
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'planDate2',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
                    />

                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={6}>
                  <FormItem
                    label="Start Date"
                    colon={false}
                    validateStatus={realStartDate2.validateStatus}
                    help={realStartDate2.errorMsg}
                  >
                    <DatePicker
                      value={realStartDate2.value}
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realStartDate2',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realEndDate2',
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
                        <span>
                          <Button
                            icon="close-circle"
                            style={{ height: 32 }}
                            onClick={() => clearField('clinic')}
                          />
                        </span>
                        <span>
                          <Button
                            icon="select"
                            style={{ height: 32, marginLeft: 5 }}
                            onClick={() => showHospitalScheduleWindow('clinic')}
                          />
                        </span>
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'planDate3',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
                    />

                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={6}>
                  <FormItem
                    label="Start Date"
                    colon={false}
                    validateStatus={realStartDate3.validateStatus}
                    help={realStartDate3.errorMsg}
                  >
                    <DatePicker
                      value={realStartDate3.value}
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realStartDate3',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
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
                      onChange={(date) => {
                        scheduleFormChanged({
                          key: 'realEndDate3',
                          value: date,
                        });
                      }}
                      style={{ width: '100%' }}
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
};

ScheduleForm.propTypes = {
  scheduleFormChanged: PropTypes.func.isRequired,
  showHospitalScheduleWindow: PropTypes.func.isRequired,
  clearField: PropTypes.func.isRequired,
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
    scheduleForm: state.studentReducers.courseForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    scheduleFormChanged: (payload) => {
      dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload,
      });
    },
    showHospitalScheduleWindow: (resultContainer) => {
      dispatch({
        type: 'CLEAR_HOSPITAL_SCHEDULE_SELECT',
      });

      dispatch({
        type: 'SHOW_HOSPITAL_SCHEDULE_WINDOW',
        payload: resultContainer,
      });

      dispatch({
        type: 'FETCH_HOSPITAL_SCHEDULES_LOGIC',
      });
    },
    clearField: (key) => {
      dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload: {
          key,
          value: null,
        },
      });
      if (key === 'clinic') {
        dispatch({
          type: 'COURSE_FORM_CHANGED_LOGIC',
          payload: { key: 'dpk', value: null },
        });
        dispatch({
          type: 'CLEAR_DOCENTS_BY_CD',
        });
      } else {
        dispatch({
          type: 'COURSE_FORM_CHANGED_LOGIC',
          payload: { key: 'adviser', value: null },
        });
        dispatch({
          type: 'COURSE_FORM_CHANGED_LOGIC',
          payload: { key: 'examiner', value: null },
        });
        dispatch({
          type: 'CLEAR_DOCENTS_BY_HD',
        });
      }
    },
  }
);

const ScheduleFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleForm);

export default ScheduleFormWrapper;
