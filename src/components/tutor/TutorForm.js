import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const TutorForm = ({ tutorForm, tutorFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={tutorForm.code.validateStatus}
          help={tutorForm.code.errorMsg}
        >
          <Input
            value={tutorForm.code.value}
            onChange={(e) => {
              tutorFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={tutorForm.name.validateStatus}
          help={tutorForm.name.errorMsg}
        >
          <Input
            value={tutorForm.name.value}
            onChange={(e) => {
              tutorFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={50}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

TutorForm.propTypes = {
  tutorFormChanged: PropTypes.func.isRequired,
  tutorForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    tutorForm: state.tutorReducers.tutorForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    tutorFormChanged: (payload) => {
      dispatch({
        type: 'TUTOR_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const TutorFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorForm);

export default TutorFormWrapper;
