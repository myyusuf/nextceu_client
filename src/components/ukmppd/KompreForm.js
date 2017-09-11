import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import InputNumber from 'antd/lib/input-number';
import UptSelect from './upt/UptSelect';

const FormItem = Form.Item;

const KompreForm = ({ kompreForm, kompreFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <FormItem
              label="Score"
              colon={false}
              validateStatus={kompreForm.score.validateStatus}
              help={kompreForm.score.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={kompreForm.score.value}
                onChange={(value) => {
                  kompreFormChanged({
                    key: 'score',
                    value,
                  });
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              label="Type"
              colon={false}
              validateStatus={kompreForm.kompreType.validateStatus}
              help={kompreForm.kompreType.errorMsg}
            >
              <UptSelect
                value={kompreForm.kompreType.value}
                onSelect={(value) => {
                  kompreFormChanged({
                    key: 'kompreType',
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
              validateStatus={kompreForm.kompreDate.validateStatus}
              help={kompreForm.kompreDate.errorMsg}
            >
              <DatePicker
                value={kompreForm.kompreDate.value}
                onChange={(date) => {
                  kompreFormChanged({
                    key: 'kompreDate',
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
              validateStatus={kompreForm.selected.validateStatus}
              help={kompreForm.selected.errorMsg}
            >
              <Checkbox
                checked={kompreForm.selected.value}
                onChange={(e) => {
                  kompreFormChanged({
                    key: 'selected',
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
  </Form>
);

KompreForm.propTypes = {
  kompreFormChanged: PropTypes.func.isRequired,
  kompreForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    kompreForm: state.ukmppdReducers.kompreForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    kompreFormChanged: (payload) => {
      dispatch({
        type: 'KOMPRE_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const KompreFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KompreForm);


export default KompreFormWrapper;
