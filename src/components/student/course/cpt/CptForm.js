import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const CptForm = ({ cptForm, cptFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={cptForm.code.validateStatus}
          help={cptForm.code.errorMsg}
        >
          <Input
            value={cptForm.code.value}
            onChange={(e) => {
              cptFormChanged({
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
          validateStatus={cptForm.name.validateStatus}
          help={cptForm.name.errorMsg}
        >
          <Input
            value={cptForm.name.value}
            onChange={(e) => {
              cptFormChanged({
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
  </Form>
);

CptForm.propTypes = {
  cptFormChanged: PropTypes.func.isRequired,
  cptForm: PropTypes.shape({
    code: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    cptForm: state.studentReducers.cptForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    cptFormChanged: (payload) => {
      dispatch({
        type: 'CPT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const CptFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CptForm);

export default CptFormWrapper;
