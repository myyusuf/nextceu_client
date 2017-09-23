import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';

const Column = Table.Column;

class AssistanceList extends Component {
  render() {
    const {
      assistances,
      fetchAssistances,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchAssistances()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={assistances} style={{ marginTop: 15 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Title"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Date"
                dataIndex="eventDate"
                key="eventDate"
                render={text => (
                  <span>
                    {moment(text).format('DD/MM/YYYY')}
                  </span>
                )}
              />
              <Column
                title="Time"
                dataIndex="eventTime"
                key="eventTime"
                render={text => (
                  <span>
                    {moment(text).format('HH:mm:ss')}
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

AssistanceList.propTypes = {
  fetchAssistances: PropTypes.func.isRequired,
  assistances: PropTypes.arrayOf(PropTypes.shape.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    assistances: state.assistanceReducers.studentAssistances.assistances,
    loading: state.assistanceReducers.studentAssistances.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchAssistances: () => (
      dispatch({
        type: 'FETCH_STUDENT_ASSISTANCES_LOGIC',
      })
    ),
  }
);

const AssistanceListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssistanceList);

export default AssistanceListWrapper;
