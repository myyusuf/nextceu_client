import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import CourseProblemTypeSelect from '../cpt/CptSelect';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const CourseProblemForm = ({ courseProblemForm, courseProblemFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={12}>
            <FormItem
              label="Title"
              colon={false}
              validateStatus={courseProblemForm.title.validateStatus}
              help={courseProblemForm.title.errorMsg}
            >
              <Input
                value={courseProblemForm.title.value}
                onChange={(e) => {
                  courseProblemFormChanged({
                    key: 'title',
                    value: e.target.value,
                  });
                }}
                placeholder="Title"
                maxLength={100}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              label="Description"
              colon={false}
              validateStatus={courseProblemForm.description.validateStatus}
              help={courseProblemForm.description.errorMsg}
            >
              <TextArea
                value={courseProblemForm.description.value}
                onChange={(e) => {
                  courseProblemFormChanged({
                    key: 'description',
                    value: e.target.value,
                  });
                }}
                placeholder="Description"
                rows={2}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <FormItem
              label="Type"
              colon={false}
              validateStatus={courseProblemForm.courseProblemType.validateStatus}
              help={courseProblemForm.courseProblemType.errorMsg}
            >
              <CourseProblemTypeSelect
                value={courseProblemForm.courseProblemType.value}
                onSelect={(value) => {
                  courseProblemFormChanged({
                    key: 'courseProblemType',
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
              validateStatus={courseProblemForm.problemDate.validateStatus}
              help={courseProblemForm.problemDate.errorMsg}
            >
              <DatePicker
                value={courseProblemForm.problemDate.value}
                onChange={(date) => {
                  courseProblemFormChanged({
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
              label="Comment"
              colon={false}
              validateStatus={courseProblemForm.comment.validateStatus}
              help={courseProblemForm.comment.errorMsg}
            >
              <TextArea
                value={courseProblemForm.comment.value}
                onChange={(e) => {
                  courseProblemFormChanged({
                    key: 'comment',
                    value: e.target.value,
                  });
                }}
                placeholder="Comment"
                rows={2}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              colon={false}
              validateStatus={courseProblemForm.completed.validateStatus}
              help={courseProblemForm.completed.errorMsg}
            >
              <Checkbox
                value={courseProblemForm.completed.value}
                onChange={(e) => {
                  courseProblemFormChanged({
                    key: 'completed',
                    value: e.target.value,
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

CourseProblemForm.propTypes = {
  courseProblemFormChanged: PropTypes.func.isRequired,
  courseProblemForm: PropTypes.shape({
    preTest: PropTypes.number.isRequired,
    research: PropTypes.number.isRequired,
    weeklyDiscussion: PropTypes.number.isRequired,
    test: PropTypes.number.isRequired,
    postTest: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    courseProblemForm: state.studentReducers.courseProblemForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    courseProblemFormChanged: (payload) => {
      dispatch({
        type: 'COURSE_PROBLEM_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const CourseProblemFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseProblemForm);


export default CourseProblemFormWrapper;
