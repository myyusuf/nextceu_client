import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const StudentForm = ({ studentForm, studentFormChanged }) => (
  <Form>
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

      </Col>
    </Row>
    <Row>
      <Col span={24}>
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
  </Form>
);

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
        type: 'USER_FORM_CHANGED_LOGIC',
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
