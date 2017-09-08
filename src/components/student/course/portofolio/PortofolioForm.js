import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import PortofolioTypeSelect from '../pft/PftSelect';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const PortofolioForm = ({ portofolioForm, portofolioFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <FormItem
              label="Type"
              colon={false}
              validateStatus={portofolioForm.portofolioType.validateStatus}
              help={portofolioForm.portofolioType.errorMsg}
            >
              <PortofolioTypeSelect
                value={portofolioForm.portofolioType.value}
                onSelect={(value) => {
                  portofolioFormChanged({
                    key: 'portofolioType',
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
              validateStatus={portofolioForm.problemDate.validateStatus}
              help={portofolioForm.problemDate.errorMsg}
            >
              <DatePicker
                value={portofolioForm.problemDate.value}
                onChange={(date) => {
                  portofolioFormChanged({
                    key: 'problemDate',
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
              validateStatus={portofolioForm.completed.validateStatus}
              help={portofolioForm.completed.errorMsg}
            >
              <Checkbox
                checked={portofolioForm.completed.value}
                onChange={(e) => {
                  portofolioFormChanged({
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
  </Form>
);

PortofolioForm.propTypes = {
  portofolioFormChanged: PropTypes.func.isRequired,
  portofolioForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    portofolioForm: state.studentReducers.portofolioForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    portofolioFormChanged: (payload) => {
      dispatch({
        type: 'PORTOFOLIO_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const PortofolioFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PortofolioForm);


export default PortofolioFormWrapper;
