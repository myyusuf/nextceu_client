import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Checkbox from 'antd/lib/checkbox';

import * as actions from '../../actions/ActionType';

const FormItem = Form.Item;

const YscForm = ({ yscForm, yscFormChanged }) => {
  return (
    <Form style={{ marginTop: -5 }}>
      <Row>
        <Col span={24}>
          <FormItem
            colon={false}
            validateStatus={yscForm.checklist1.validateStatus}
            help={yscForm.checklist1.errorMsg}
          >
            <Checkbox
              checked={yscForm.checklist1.value}
              onChange={(e) => {
                yscFormChanged({
                  key: 'checklist1',
                  value: e.target.checked,
                });
              }}
            >
              Tanda Tangan Bakordik
            </Checkbox>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem
            colon={false}
            validateStatus={yscForm.checklist2.validateStatus}
            help={yscForm.checklist2.errorMsg}
          >
            <Checkbox
              checked={yscForm.checklist2.value}
              onChange={(e) => {
                yscFormChanged({
                  key: 'checklist2',
                  value: e.target.checked,
                });
              }}
            >
              Tanda Tangan PA
            </Checkbox>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem
            colon={false}
            validateStatus={yscForm.checklist3.validateStatus}
            help={yscForm.checklist3.errorMsg}
          >
            <Checkbox
              checked={yscForm.checklist3.value}
              onChange={(e) => {
                yscFormChanged({
                  key: 'checklist3',
                  value: e.target.checked,
                });
              }}
            >
              Tanda Tangan Ketua CEU
            </Checkbox>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

YscForm.propTypes = {
  yscFormChanged: PropTypes.func.isRequired,
  yscForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    yscForm: state.yudisiumReducers.yscForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    yscFormChanged: (payload) => {
      dispatch({
        type: actions.yudisium.yscForm.changed,
        payload,
      });
    },
  }
);

const YscFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YscForm);

export default YscFormWrapper;
