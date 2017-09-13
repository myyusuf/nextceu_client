import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Radio from 'antd/lib/radio';
import Tabs from 'antd/lib/tabs';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import StudentLevelSelect from './StudentLevelSelect';
import Constant from '../../Constant';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

const uploadProps = {
  name: 'krsFile',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // fetchParticipants();
      console.log('Done Upload....');
      notification.success({
        message: 'Upload file success',
        description: info.file.response,
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: 'Upload file error',
        description: `${info.file.name} file upload failed.`,
      });
    }
  },
};

const StudentForm = ({ studentForm, studentFormChanged }) => {
  uploadProps.action = `${STUDENTS_URL}/${studentForm.id.value}/uploadfile/krs`;
  return (
    <Form style={{ marginTop: -5 }}>
      <Tabs defaultActiveKey="1" style={{ minHeight: 435 }}>
        <TabPane tab="Main" key="1">
          <Row gutter={15}>
            <Col span={12}>
              <FormItem
                label="Old SID"
                colon={false}
                validateStatus={studentForm.oldSid.validateStatus}
                help={studentForm.oldSid.errorMsg}
              >
                <Input
                  value={studentForm.oldSid.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'oldSid',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Old SID"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="New SID"
                colon={false}
                validateStatus={studentForm.newSid.validateStatus}
                help={studentForm.newSid.errorMsg}
              >
                <Input
                  value={studentForm.newSid.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'newSid',
                      value: e.target.value,
                    });
                  }}
                  placeholder="New SID"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="Name"
                colon={false}
                validateStatus={studentForm.name.validateStatus}
                help={studentForm.name.errorMsg}
              >
                <Input
                  value={studentForm.name.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'name',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Student name"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="Gender"
                colon={false}
                validateStatus={studentForm.gender.validateStatus}
                help={studentForm.gender.errorMsg}
              >
                <RadioGroup
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'gender',
                      value: e.target.value,
                    });
                  }}
                  value={studentForm.gender.value}
                >
                  <Radio value="M">Male</Radio>
                  <Radio value="F">Female</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="Level"
                colon={false}
                validateStatus={studentForm.level.validateStatus}
                help={studentForm.level.errorMsg}
              >
                <StudentLevelSelect
                  value={studentForm.level.value}
                  onSelect={(value) => {
                    studentFormChanged({
                      key: 'level',
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
                label="Email"
                colon={false}
                validateStatus={studentForm.email.validateStatus}
                help={studentForm.email.errorMsg}
              >
                <Input
                  value={studentForm.email.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'email',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Email"
                />
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Details" key="2">
          <Row>
            <Col span={24}>
              <FormItem
                label="Birth Date"
                colon={false}
                validateStatus={studentForm.birthDate.validateStatus}
                help={studentForm.birthDate.errorMsg}
              >
                <DatePicker
                  value={studentForm.birthDate.value}
                  onChange={(date) => {
                    studentFormChanged({
                      key: 'birthDate',
                      value: date,
                    });
                  }}
                />

              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Contact" key="3">
          <Row>
            <Col span={24}>
              <FormItem
                label="Address"
                colon={false}
                validateStatus={studentForm.address.validateStatus}
                help={studentForm.address.errorMsg}
              >
                <Input
                  value={studentForm.address.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'address',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Address"
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem
                label="Landline"
                colon={false}
                validateStatus={studentForm.phone.validateStatus}
                help={studentForm.phone.errorMsg}
              >
                <Input
                  value={studentForm.phone.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'phone',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Landline"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Mobile"
                colon={false}
                validateStatus={studentForm.mobilePhone.validateStatus}
                help={studentForm.mobilePhone.errorMsg}
              >
                <Input
                  value={studentForm.mobilePhone.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'mobilePhone',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Mobile"
                />
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Education" key="4">
          <Row gutter={15}>
            <Col span={12}>
              <FormItem
                label="Enroll Year"
                colon={false}
                validateStatus={studentForm.enrollYear.validateStatus}
                help={studentForm.enrollYear.errorMsg}
              >
                <InputNumber
                  min={2000}
                  max={2099}
                  value={studentForm.enrollYear.value}
                  onChange={(value) => {
                    studentFormChanged({
                      key: 'enrollYear',
                      value,
                    });
                  }}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Graduate Year"
                colon={false}
                validateStatus={studentForm.graduateYear.validateStatus}
                help={studentForm.graduateYear.errorMsg}
              >
                <InputNumber
                  min={2000}
                  max={2099}
                  value={studentForm.graduateYear.value}
                  onChange={(value) => {
                    studentFormChanged({
                      key: 'graduateYear',
                      value,
                    });
                  }}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem
                label="Certificate Number"
                colon={false}
                validateStatus={studentForm.certificateNumber.validateStatus}
                help={studentForm.certificateNumber.errorMsg}
              >
                <Input
                  value={studentForm.certificateNumber.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'certificateNumber',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Certificate Number"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="IPK"
                colon={false}
                validateStatus={studentForm.ipk.validateStatus}
                help={studentForm.ipk.errorMsg}
              >
                <InputNumber
                  min={0}
                  max={4}
                  step={0.1}
                  value={studentForm.ipk.value}
                  onChange={(value) => {
                    studentFormChanged({
                      key: 'ipk',
                      value,
                    });
                  }}
                />
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Registration" key="5">
          <Row>
            <Col span={8}>
              <FormItem
                colon={false}
                validateStatus={studentForm.krs.validateStatus}
                help={studentForm.krs.errorMsg}
              >
                <Checkbox
                  checked={studentForm.krs.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'krs',
                      value: e.target.checked,
                    });
                  }}
                >
                  KRS
                </Checkbox>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                colon={false}
              >
                No File
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                colon={false}
              >
                <Upload {...uploadProps} disabled={!studentForm.id.value} showUploadList={false}>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                colon={false}
                validateStatus={studentForm.spp.validateStatus}
                help={studentForm.spp.errorMsg}
              >
                <Checkbox
                  checked={studentForm.spp.value}
                  onChange={(e) => {
                    studentFormChanged({
                      key: 'spp',
                      value: e.target.checked,
                    });
                  }}
                >
                  SPP
                </Checkbox>
              </FormItem>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Form>
  );
};

StudentForm.propTypes = {
  studentFormChanged: PropTypes.func.isRequired,
  studentForm: PropTypes.shape({
    oldSid: PropTypes.shape.isRequired,
    newSid: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
    level: PropTypes.shape.isRequired,
    email: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    studentForm: state.studentReducers.studentForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    studentFormChanged: (payload) => {
      dispatch({
        type: 'STUDENT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const StudentFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentForm);

export default StudentFormWrapper;
