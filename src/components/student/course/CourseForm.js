import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Badge from 'antd/lib/badge';
import Tag from 'antd/lib/tag';
import numeral from 'numeral';
import mathjs from 'mathjs';

const Option = Select.Option;

const FormItem = Form.Item;

const CourseForm = ({ courseForm, courseFormChanged, scores }) => {
  let status = '';
  let text = '';

  switch (courseForm.status ? courseForm.status.value : null) {
    case 0:
      status = 'default';
      text = 'Scheduled';
      break;
    case 1:
      status = 'processing';
      text = 'On Going';
      break;
    case 2:
      status = 'success';
      text = 'Completed';
      break;
    case 3:
      status = 'error';
      text = `Problem : ${courseForm.tempProblemDescription.value}`;
      break;
    case 4:
      status = 'error';
      text = 'Pending';
      break;
    default:
      break;
  }

  const score1Arr = scores.filter(score => score.ScoreType.code === 'PRETEST');
  const score1 = score1Arr.length > 0 ? score1Arr[0].scoreValue : null;
  const score1Percentage = score1 ? score1 * 0 : null;

  const score2Arr = scores.filter(score => score.ScoreType.code === 'CASEREPORT');
  const score2 = score2Arr.length > 0 ? score2Arr[0].scoreValue : null;
  const score2Percentage = score2 ? score2 * 0.1 : null;

  const score3Arr = scores.filter(score => score.ScoreType.code === 'WEEKLYDISCUSSION');
  const score3 = score3Arr.length > 0 ? score3Arr[0].scoreValue : null;
  const score3Percentage = score3 ? score3 * 0.2 : null;

  const score4Arr = scores.filter(score => score.ScoreType.code === 'CASETEST');
  const score4 = score4Arr.length > 0 ? score4Arr[0].scoreValue : null;
  const score4Percentage = score4 ? score4 * 0.35 : null;

  const score5Arr = scores.filter(score => score.ScoreType.code === 'POSTTEST');
  const score5 = score5Arr.length > 0 ? score5Arr[0].scoreValue : null;
  const score5Percentage = score5 ? score5 * 0.35 : null;

  const totalPercentage = score1Percentage + score2Percentage + score3Percentage
  + score4Percentage + score5Percentage;

  const total = score1 + score2 + score3
  + score4 + score5;

  let totalInCriteria = null;
  const totalPercentageRound = mathjs.round(totalPercentage, 2);
  if (totalPercentageRound >= 80 && totalPercentageRound <= 100) {
    totalInCriteria = <span style={{ color: '#5093E1' }}>A</span>;
  } else if (totalPercentageRound >= 70 && totalPercentageRound <= 79) {
    totalInCriteria = <span style={{ color: '#50C14E' }}>B</span>;
  } else if (totalPercentageRound >= 60 && totalPercentageRound <= 69) {
    totalInCriteria = <span style={{ color: 'orange' }}>C</span>;
  } else if (totalPercentageRound > 0 && totalPercentageRound <= 59) {
    totalInCriteria = <span style={{ color: 'red' }}>E</span>;
  } else if (totalPercentageRound <= 0) {
    totalInCriteria = <span style={{ color: 'gray' }}>-</span>;
  }

  return (
    <Form>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <FormItem
                label="Title"
                colon={false}
                validateStatus={courseForm.title.validateStatus}
                help={courseForm.title.errorMsg}
              >
                <Input
                  value={courseForm.title.value}
                  onChange={(e) => {
                    courseFormChanged({
                      key: 'title',
                      value: e.target.value,
                    });
                  }}
                  placeholder="Title"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="Score Summary"
                colon={false}
              >
                <table>
                  <tr>
                    <td style={{ width: 160 }}>1. Pre Test (SCB)</td>
                    <td
                      style={{ width: 40, textAlign: 'right' }}
                    >
                      {score1 ? numeral(score1).format('0,0.00') : '-'}
                    </td>
                    <td style={{ textAlign: 'right', paddingLeft: 20 }}>
                      <Tag>{`${numeral(score1Percentage).format('0,0.00')} %`}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: 160 }}>2. Case Report</td>
                    <td
                      style={{ width: 40, textAlign: 'right' }}
                    >
                      {score2 ? numeral(score2).format('0,0.00') : '-'}
                    </td>
                    <td style={{ textAlign: 'right', paddingLeft: 20 }}>
                      <Tag>{`${numeral(score2Percentage).format('0,0.00')} %`}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: 160 }}>3. Weekly Discussion</td>
                    <td
                      style={{ width: 40, textAlign: 'right' }}
                    >
                      {score3 ? numeral(score3).format('0,0.00') : '-'}
                    </td>
                    <td style={{ textAlign: 'right', paddingLeft: 20 }}>
                      <Tag>{`${numeral(score3Percentage).format('0,0.00')} %`}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: 160 }}>4. Case Test</td>
                    <td
                      style={{ width: 40, textAlign: 'right' }}
                    >
                      {score4 ? numeral(score4).format('0,0.00') : '-'}
                    </td>
                    <td style={{ textAlign: 'right', paddingLeft: 20 }}>
                      <Tag>{`${numeral(score4Percentage).format('0,0.00')} %`}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: 160 }}>5. Post Test</td>
                    <td
                      style={{ width: 40, textAlign: 'right' }}
                    >
                      {score5 ? numeral(score5).format('0,0.00') : '-'}
                    </td>
                    <td style={{ textAlign: 'right', paddingLeft: 20 }}>
                      <Tag>{`${numeral(score5Percentage).format('0,0.00')} %`}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td><span style={{ width: 160, fontWeight: 'bold', fontSize: 15 }}>Total</span></td>
                    <td style={{ width: 40, textAlign: 'right' }}>
                      {numeral(total).format('0,0.00')}
                    </td>
                    <td style={{ textAlign: 'right', paddingLeft: 20 }}>
                      <Tag>{`${numeral(totalPercentage).format('0,0.00')} %`}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td><span style={{ fontWeight: 'bold', fontSize: 15 }}>Score</span></td>
                    <td></td>
                    <td style={{ textAlign: 'center' }}><span style={{ fontWeight: 'bold', fontSize: 20 }}>{totalInCriteria}</span></td>
                  </tr>
                </table>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {/* <FormItem
                label="Completion"
                colon={false}
                validateStatus={courseForm.completion.validateStatus}
                help={courseForm.completion.errorMsg}
              >
                <Select
                  defaultValue="0"
                  value={courseForm.completion.value}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    courseFormChanged({
                      key: 'completion',
                      value,
                    });
                  }}
                >
                  <Option value={0}>0 %</Option>
                  <Option value={25}>25 %</Option>
                  <Option value={50}>50 %</Option>
                  <Option value={75}>75 %</Option>
                  <Option value={100}>100 %</Option>
                </Select>
              </FormItem> */}
              <FormItem
                label="Status"
                colon={false}
              >
                <Badge status={status} text={text} />
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

CourseForm.propTypes = {
  courseFormChanged: PropTypes.func.isRequired,
  courseForm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completion: PropTypes.number.isRequired,
  }).isRequired,
  scores: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => (
  {
    courseForm: state.studentReducers.courseForm,
    scores: state.studentReducers.scores,
  }
);

const mapDispatchToProps = dispatch => (
  {
    courseFormChanged: (payload) => {
      dispatch(dispatch({
        type: 'COURSE_FORM_CHANGED_LOGIC',
        payload,
      }));
    },
  }
);

const CourseFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseForm);

export default CourseFormWrapper;
