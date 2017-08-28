import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';

const FormItem = Form.Item;

const ScoreForm = ({ scoreForm, scoreFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={6}>
            <FormItem
              label="Pre-Test"
              colon={false}
              validateStatus={scoreForm.preTest.validateStatus}
              help={scoreForm.preTest.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={scoreForm.preTest.value}
                onChange={(value) => {
                  scoreFormChanged({
                    key: 'preTest',
                    value,
                  });
                }}
                style={{ width: 250 }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="Research"
              colon={false}
              validateStatus={scoreForm.research.validateStatus}
              help={scoreForm.research.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={scoreForm.research.value}
                onChange={(value) => {
                  scoreFormChanged({
                    key: 'research',
                    value,
                  });
                }}
                style={{ width: 250 }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="Weekly Discussion"
              colon={false}
              validateStatus={scoreForm.weeklyDiscussion.validateStatus}
              help={scoreForm.weeklyDiscussion.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={scoreForm.weeklyDiscussion.value}
                onChange={(value) => {
                  scoreFormChanged({
                    key: 'weeklyDiscussion',
                    value,
                  });
                }}
                style={{ width: 250 }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="Test"
              colon={false}
              validateStatus={scoreForm.test.validateStatus}
              help={scoreForm.test.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={scoreForm.test.value}
                onChange={(value) => {
                  scoreFormChanged({
                    key: 'test',
                    value,
                  });
                }}
                style={{ width: 250 }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="Post-Test"
              colon={false}
              validateStatus={scoreForm.postTest.validateStatus}
              help={scoreForm.postTest.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={scoreForm.postTest.value}
                onChange={(value) => {
                  scoreFormChanged({
                    key: 'postTest',
                    value,
                  });
                }}
                style={{ width: 250 }}
              />
            </FormItem>
          </Col>
        </Row>
      </Col>
    </Row>
  </Form>
);

ScoreForm.propTypes = {
  scoreFormChanged: PropTypes.func.isRequired,
  scoreForm: PropTypes.shape({
    preTest: PropTypes.number.isRequired,
    research: PropTypes.number.isRequired,
    weeklyDiscussion: PropTypes.number.isRequired,
    test: PropTypes.number.isRequired,
    postTest: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    scoreForm: state.studentReducers.scoreForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    scoreFormChanged: (payload) => {
      dispatch({
        type: 'SCORE_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const ScoreFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreForm);


export default ScoreFormWrapper;
