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
    const { preTest } = this.props.scoreForm;
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
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
