import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import Tabs from 'antd/lib/tabs';
import SglTypeSelect from '../sgt/SgtSelect';
import PengampuSelect from '../../../pengampu/PengampuSelect';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const SglForm = ({ sglForm, sglFormChanged }) => (
  <Form>
    <Tabs defaultActiveKey="1" style={{ minHeight: 335 }}>
      <TabPane tab="Main" key="1">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <FormItem
                  label="Type"
                  colon={false}
                  validateStatus={sglForm.sglType.validateStatus}
                  help={sglForm.sglType.errorMsg}
                >
                  <SglTypeSelect
                    value={sglForm.sglType.value}
                    onSelect={(value) => {
                      sglFormChanged({
                        key: 'sglType',
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
                  label="Date"
                  colon={false}
                  validateStatus={sglForm.sglDate.validateStatus}
                  help={sglForm.sglDate.errorMsg}
                >
                  <DatePicker
                    value={sglForm.sglDate.value}
                    onChange={(date) => {
                      sglFormChanged({
                        key: 'sglDate',
                        value: date,
                      });
                    }}
                    style={{ width: '100%' }}
                  />

                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  colon={false}
                  validateStatus={sglForm.completed.validateStatus}
                  help={sglForm.completed.errorMsg}
                >
                  <Checkbox
                    checked={sglForm.completed.value}
                    onChange={(e) => {
                      sglFormChanged({
                        key: 'completed',
                        value: e.target.checked,
                      });
                    }}
                  >
                    Completed
                  </Checkbox>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Tutors" key="2">
        <Row>
          <Col span={16}>
            <FormItem
              label="Utama"
              colon={false}
              validateStatus={sglForm.mainTutor.validateStatus}
              help={sglForm.mainTutor.errorMsg}
            >
              <PengampuSelect
                value={sglForm.mainTutor.value}
                onChange={(value) => {
                  sglFormChanged({
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
              validateStatus={sglForm.mainTutorPresent.validateStatus}
              help={sglForm.mainTutorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={sglForm.mainTutorPresent.value}
                onChange={(e) => {
                  sglFormChanged({
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
              validateStatus={sglForm.secondTutor.validateStatus}
              help={sglForm.secondTutor.errorMsg}
            >
              <PengampuSelect
                value={sglForm.secondTutor.value}
                onChange={(value) => {
                  sglFormChanged({
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
              validateStatus={sglForm.secondTutorPresent.validateStatus}
              help={sglForm.secondTutorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={sglForm.secondTutorPresent.value}
                onChange={(e) => {
                  sglFormChanged({
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
              validateStatus={sglForm.thirdTutor.validateStatus}
              help={sglForm.thirdTutor.errorMsg}
            >
              <PengampuSelect
                value={sglForm.thirdTutor.value}
                onChange={(value) => {
                  sglFormChanged({
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
              validateStatus={sglForm.thirdTutorPresent.validateStatus}
              help={sglForm.thirdTutorPresent.errorMsg}
            >
              <Checkbox
                style={{ marginLeft: 10 }}
                checked={sglForm.thirdTutorPresent.value}
                onChange={(e) => {
                  sglFormChanged({
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
      </TabPane>
    </Tabs>
  </Form>
);

SglForm.propTypes = {
  sglFormChanged: PropTypes.func.isRequired,
  sglForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    sglForm: state.studentReducers.sglForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    sglFormChanged: (payload) => {
      dispatch({
        type: 'SGL_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const SglFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SglForm);


export default SglFormWrapper;
