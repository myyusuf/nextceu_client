import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import Tabs from 'antd/lib/tabs';
import Checkbox from 'antd/lib/checkbox';
import TutorSelect from '../tutor/TutorSelect';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

const AssistanceForm = ({ assistanceForm, assistanceFormChanged }) => (
  <Form>
    <Tabs defaultActiveKey="1" style={{ minHeight: 335 }}>
      <TabPane tab="Main" key="1">
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
      </TabPane>
      <TabPane tab="Tutors" key="2">
        <Row>
          <Col span={16}>
            <FormItem
              label="Utama"
              colon={false}
              validateStatus={assistanceForm.mainTutor.validateStatus}
              help={assistanceForm.mainTutor.errorMsg}
            >
              <TutorSelect
                value={assistanceForm.mainTutor.value}
                onChange={(value) => {
                  assistanceFormChanged({
                    key: 'mainTutor',
                    value,
                  });
                }}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label=" "
              colon={false}
              validateStatus={assistanceForm.mainTutorPresent.validateStatus}
              help={assistanceForm.mainTutorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={assistanceForm.mainTutorPresent.value}
                onChange={(e) => {
                  assistanceFormChanged({
                    key: 'mainTutorPresent',
                    value: e.target.checked,
                  });
                }}
              >
                Present
              </Checkbox>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <FormItem
              label="Cadangan"
              colon={false}
              validateStatus={assistanceForm.secondTutor.validateStatus}
              help={assistanceForm.secondTutor.errorMsg}
            >
              <TutorSelect
                value={assistanceForm.secondTutor.value}
                onChange={(value) => {
                  assistanceFormChanged({
                    key: 'secondTutor',
                    value,
                  });
                }}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label=" "
              colon={false}
              validateStatus={assistanceForm.secondTutorPresent.validateStatus}
              help={assistanceForm.secondTutorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={assistanceForm.secondTutorPresent.value}
                onChange={(e) => {
                  assistanceFormChanged({
                    key: 'secondTutorPresent',
                    value: e.target.checked,
                  });
                }}
              >
                Present
              </Checkbox>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <FormItem
              label="Siaga"
              colon={false}
              validateStatus={assistanceForm.thirdTutor.validateStatus}
              help={assistanceForm.thirdTutor.errorMsg}
            >
              <TutorSelect
                value={assistanceForm.thirdTutor.value}
                onChange={(value) => {
                  assistanceFormChanged({
                    key: 'thirdTutor',
                    value,
                  });
                }}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label=" "
              colon={false}
              validateStatus={assistanceForm.thirdTutorPresent.validateStatus}
              help={assistanceForm.thirdTutorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={assistanceForm.thirdTutorPresent.value}
                onChange={(e) => {
                  assistanceFormChanged({
                    key: 'thirdTutorPresent',
                    value: e.target.checked,
                  });
                }}
              >
                Present
              </Checkbox>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <FormItem
              label="Pendamping"
              colon={false}
              validateStatus={assistanceForm.facilitator.validateStatus}
              help={assistanceForm.facilitator.errorMsg}
            >
              <TutorSelect
                value={assistanceForm.facilitator.value}
                onChange={(value) => {
                  assistanceFormChanged({
                    key: 'facilitator',
                    value,
                  });
                }}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label=" "
              colon={false}
              validateStatus={assistanceForm.facilitatorPresent.validateStatus}
              help={assistanceForm.facilitatorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={assistanceForm.facilitatorPresent.value}
                onChange={(e) => {
                  assistanceFormChanged({
                    key: 'facilitatorPresent',
                    value: e.target.checked,
                  });
                }}
              >
                Present
              </Checkbox>
            </FormItem>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
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
