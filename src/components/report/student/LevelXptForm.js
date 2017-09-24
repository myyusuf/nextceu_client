import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import * as actions from '../../../actions/ActionType';

const FormItem = Form.Item;

const LevelXptForm = ({ levelXptForm, levelXptFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Pre Test Date"
          colon={false}
          validateStatus={levelXptForm.preTestDate.validateStatus}
          help={levelXptForm.preTestDate.errorMsg}
        >
          <DatePicker
            value={levelXptForm.preTestDate.value}
            onChange={(date) => {
              levelXptFormChanged({
                key: 'preTestDate',
                value: date,
              });
            }}
            style={{ width: '100%' }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

LevelXptForm.propTypes = {
  levelXptFormChanged: PropTypes.func.isRequired,
  levelXptForm: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    levelXptForm: state.reportReducers.levelXptForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    levelXptFormChanged: (payload) => {
      dispatch({
        type: actions.report.student.levelXpt.form.changed,
        payload,
      });
    },
  }
);

const LevelXptFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelXptForm);

export default LevelXptFormWrapper;
