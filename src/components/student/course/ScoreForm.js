import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';

const FormItem = Form.Item;

class ScoreForm extends Component {

  handleInputChange = (name, value) => {
    this.props.scoreFormChanged({
      key: name,
      value,
    });
  }

  render() {
    const {
      preTest,
      research,
      weeklyDiscussion,
      test,
      postTest,
    } = this.props.scoreForm;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={6}>
                <FormItem
                  label="Pre-Test"
                  colon={false}
                  validateStatus={preTest.validateStatus}
                  help={preTest.errorMsg}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => {
                      this.handleInputChange('preTest', e.target.value);
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
                  validateStatus={research.validateStatus}
                  help={research.errorMsg}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => {
                      this.handleInputChange('research', e.target.value);
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
                  validateStatus={weeklyDiscussion.validateStatus}
                  help={weeklyDiscussion.errorMsg}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => {
                      this.handleInputChange('weeklyDiscussion', e.target.value);
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
                  validateStatus={test.validateStatus}
                  help={test.errorMsg}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => {
                      this.handleInputChange('test', e.target.value);
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
                  validateStatus={postTest.validateStatus}
                  help={postTest.errorMsg}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => {
                      this.handleInputChange('postTest', e.target.value);
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
  }
}

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
    scoreFormChanged: (score) => {
      dispatch({
        type: 'SCORE_FORM_CHANGED',
        payload: score,
      });
    },
  }
);

const ScoreFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreForm);


export default ScoreFormWrapper;
