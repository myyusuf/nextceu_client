import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const AppPropForm = ({ apPropForm, apPropFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={apPropForm.code.validateStatus}
          help={apPropForm.code.errorMsg}
        >
          <Input
            value={apPropForm.code.value}
            onChange={(e) => {
              apPropFormChanged({
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
          validateStatus={apPropForm.name.validateStatus}
          help={apPropForm.name.errorMsg}
        >
          <Input
            value={apPropForm.name.value}
            onChange={(e) => {
              apPropFormChanged({
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
          validateStatus={apPropForm.stringValue.validateStatus}
          help={apPropForm.stringValue.errorMsg}
        >
          <Input
            value={apPropForm.stringValue.value}
            onChange={(e) => {
              apPropFormChanged({
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
  apPropFormChanged: PropTypes.func.isRequired,
  apPropForm: PropTypes.shape({
    code: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    apPropForm: state.settingsReducers.apPropForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    apPropFormChanged: (payload) => {
      dispatch({
        type: 'ROLE_FORM_CHANGED_LOGIC',
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
