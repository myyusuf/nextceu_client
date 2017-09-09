import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const AppPropForm = ({ appPropForm, appPropFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={appPropForm.code.validateStatus}
          help={appPropForm.code.errorMsg}
        >
          <Input
            value={appPropForm.code.value}
            onChange={(e) => {
              appPropFormChanged({
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
          validateStatus={appPropForm.name.validateStatus}
          help={appPropForm.name.errorMsg}
        >
          <Input
            value={appPropForm.name.value}
            onChange={(e) => {
              appPropFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="String Value"
          colon={false}
          validateStatus={appPropForm.stringValue.validateStatus}
          help={appPropForm.stringValue.errorMsg}
        >
          <Input
            value={appPropForm.stringValue.value}
            onChange={(e) => {
              appPropFormChanged({
                key: 'stringValue',
                value: e.target.value,
              });
            }}
            placeholder="String Value"
            maxLength={100}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

AppPropForm.propTypes = {
  appPropFormChanged: PropTypes.func.isRequired,
  appPropForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    appPropForm: state.settingsReducers.appPropForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    appPropFormChanged: (payload) => {
      dispatch({
        type: 'APP_PROP_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const AppPropFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPropForm);

export default AppPropFormWrapper;
