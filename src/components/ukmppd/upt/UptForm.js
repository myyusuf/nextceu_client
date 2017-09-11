import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const UptForm = ({ uptForm, uptFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={uptForm.code.validateStatus}
          help={uptForm.code.errorMsg}
        >
          <Input
            value={uptForm.code.value}
            onChange={(e) => {
              uptFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
            maxLength={20}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={uptForm.name.validateStatus}
          help={uptForm.name.errorMsg}
        >
          <Input
            value={uptForm.name.value}
            onChange={(e) => {
              uptFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={150}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

UptForm.propTypes = {
  uptFormChanged: PropTypes.func.isRequired,
  uptForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    uptForm: state.ukmppdReducers.uptForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    uptFormChanged: (payload) => {
      dispatch({
        type: 'UPT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const UptFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UptForm);

export default UptFormWrapper;
