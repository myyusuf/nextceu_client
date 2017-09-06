import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import DatePicker from 'antd/lib/date-picker';

const FormItem = Form.Item;

const ScoreForm = ({ scoreForm, scoreFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={12}>
            <FormItem
              label="Score"
              colon={false}
              validateStatus={scoreForm.scoreValue.validateStatus}
              help={scoreForm.scoreValue.errorMsg}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                value={scoreForm.scoreValue.value}
                onChange={(value) => {
                  scoreFormChanged({
                    key: 'scoreValue',
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
              validateStatus={scoreForm.scoreDate.validateStatus}
              help={scoreForm.scoreDate.errorMsg}
            >
              <DatePicker
                value={scoreForm.scoreDate.value}
                onChange={(date) => {
                  scoreFormChanged({
                    key: 'scoreDate',
                    value: date,
                  });
                }}
                style={{ width: '100%' }}
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
